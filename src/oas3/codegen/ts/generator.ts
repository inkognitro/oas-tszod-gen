import {
  areOutputPathsEqual,
  CodeGenerator,
  ComponentRefOutput,
  Output,
  OutputType,
  DefinitionOutput,
  doesOutPathStartWithOtherOutputPath,
  OutputPath,
} from './core';
import {
  isSpecification,
  RequestByMethodMap,
  Specification,
} from '@oas3/specification';
import {applyEndpointCallerFunction} from '@oas3/codegen/ts/endpoint';
import {EndpointId} from '@oas3/codegen/ts/template/core';

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function lowerCaseFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

type ImportNamesByPath = {
  [path: string]: string[];
};

type FileOutput = {
  importNamesByPath: ImportNamesByPath;
  definitions: DefinitionOutput[];
};

type FileOutputByFilePath = {
  [filePath: string]: FileOutput;
};

function createRelativeOutputFolderPathFromOutputPath(
  outputPath: OutputPath
): string {
  if (outputPath.length < 1) {
    throw new Error(`invalid outputPath: ${JSON.stringify(outputPath)}`);
  }
  return `./${outputPath.slice(0, 1)}`;
}

function createFilePathFromOutputPath(outputPath: OutputPath): string {
  if (outputPath.length < 2) {
    throw new Error(`invalid outputPath: ${JSON.stringify(outputPath)}`);
  }
  return `${createRelativeOutputFolderPathFromOutputPath(
    outputPath
  )}/${outputPath.slice(1, 2)}.ts`;
}

function createImportPath(
  localOutputPath: OutputPath,
  referencingOutputPath: OutputPath
): string {
  return 'foo'; // todo: implement
}

function isSameFileContext(
  outputPath: OutputPath,
  referencingPath: OutputPath
) {
  return areOutputPathsEqual(
    outputPath.slice(0, 2),
    referencingPath.slice(0, 2)
  );
}

function addImportsToFileOutputByFilePath(
  availableOutputs: Output[],
  fileOutput: FileOutput,
  output: Output
): FileOutput {
  let nextFileOutput = fileOutput;
  output.requiredOutputPaths.forEach(requiredOutputPath => {
    const requiredOutput = availableOutputs.find(o =>
      areOutputPathsEqual(o.path, requiredOutputPath)
    );
    if (!requiredOutput) {
      return;
    }
    if (isSameFileContext(requiredOutput.path, output.path)) {
      return;
    }
    const importName = requiredOutput.createName(requiredOutput.path);
    const importPath = createImportPath(requiredOutput.path, output.path);
    const importNames = nextFileOutput.importNamesByPath[importPath] ?? [];
    if (importNames.includes(importName)) {
      return;
    }
    nextFileOutput = {
      ...nextFileOutput,
      importNamesByPath: {
        ...nextFileOutput.importNamesByPath,
        [importPath]: [...importNames, importName],
      },
    };
  });
  return nextFileOutput;
}

export class DefaultCodeGenerator implements CodeGenerator {
  private readonly oas3Specs: Specification;
  private indirectOutputs: Output[];
  private operationIdPathParts: OutputPath[]; // todo: check if these are required

  constructor(oas3Specs: object) {
    if (!isSpecification(oas3Specs)) {
      throw new Error('invalid oas3 specification given');
    }
    this.oas3Specs = oas3Specs;
    this.indirectOutputs = [];
    this.operationIdPathParts = [];
  }

  generate(): Output[] {
    this.indirectOutputs = [];
    this.operationIdPathParts = [];
    for (const path in this.oas3Specs.paths) {
      const requestByMethodMap = this.oas3Specs.paths[path];
      this.generateRequestRequestByMethodMapOutputs(path, requestByMethodMap);
    }
    // todo: implement other parts
    return this.indirectOutputs;
  }

  private createOutputsByFileName(): FileOutputByFilePath {
    const fileOutputByFilePath: FileOutputByFilePath = {};
    this.indirectOutputs.forEach(output => {
      const filePath = createFilePathFromOutputPath(output.path);
      let fileOutput: FileOutput = fileOutputByFilePath[filePath] ?? {
        importNamesByPath: {},
        definitions: [],
      };
      fileOutput = addImportsToFileOutputByFilePath(
        this.indirectOutputs,
        fileOutput,
        output
      );
      switch (output.type) {
        case OutputType.COMPONENT_REF:
          return;
        case OutputType.DEFINITION:
          fileOutput = {
            ...fileOutput,
            definitions: [...fileOutput.definitions, output],
          };
          return;
        default:
          // @ts-ignore
          throw new Error(`type "${output.type}" is not supported`);
      }
      // todo: use fileOutput
    });
    return fileOutputByFilePath;
  }

  private generateRequestRequestByMethodMapOutputs(
    path: string,
    requestByMethodMap: RequestByMethodMap
  ) {
    for (const method in requestByMethodMap) {
      const requestSchema = requestByMethodMap[method];
      const endpointId: EndpointId = {path, method};
      applyEndpointCallerFunction(this, endpointId, requestSchema);
    }
  }

  addIndirectOutput(output: Output) {
    const outputWithSamePath = this.indirectOutputs.find(o =>
      areOutputPathsEqual(o.path, output.path)
    );
    if (outputWithSamePath) {
      throw new Error(
        `ambiguous definitions for outputPath: ${JSON.stringify(output.path)}"`
      );
    }
    if (output.type === OutputType.COMPONENT_REF) {
      // @ts-ignore
      const conflictingComponentRefOutput: ComponentRefOutput | undefined =
        this.indirectOutputs.find(o => {
          if (
            o.type !== OutputType.COMPONENT_REF ||
            o.componentRef !== output.componentRef
          ) {
            return false;
          }
          if (
            !o.objectDiscriminatorConfig ||
            !output.objectDiscriminatorConfig
          ) {
            return false;
          }
          return (
            JSON.stringify(o.objectDiscriminatorConfig) !==
            JSON.stringify(output.objectDiscriminatorConfig)
          );
        });
      if (conflictingComponentRefOutput) {
        throw new Error(
          `conflicting "objectDiscriminatorConfig" property for type ComponentRefOutput with componentName "${output.componentRef}":` +
            `${JSON.stringify(
              output.objectDiscriminatorConfig
            )} Vs. ${JSON.stringify(
              conflictingComponentRefOutput.objectDiscriminatorConfig
            )}`
        );
      }
    }
    this.indirectOutputs.push(output);
  }

  private getOutputPathWithoutOperationIdPathPart(
    outputPath: OutputPath
  ): OutputPath {
    // todo: check if required
    for (const index in this.operationIdPathParts) {
      const operationIdPathPart = this.operationIdPathParts[index];
      if (
        doesOutPathStartWithOtherOutputPath(outputPath, operationIdPathPart)
      ) {
        return outputPath.slice(operationIdPathPart.length - 1);
      }
    }
    return outputPath;
  }

  private findOperationIdOutputPathFromOutputPath(
    outputPath: OutputPath
  ): null | OutputPath {
    // todo: check if required
    for (const index in this.operationIdPathParts) {
      const operationIdPathPart = this.operationIdPathParts[index];
      if (
        doesOutPathStartWithOtherOutputPath(outputPath, operationIdPathPart)
      ) {
        return operationIdPathPart;
      }
    }
    return null;
  }

  private getOutputPathWithoutDomainPathPart(
    outputPath: OutputPath
  ): OutputPath {
    return outputPath.slice(1);
  }

  createOperationIdOutputPath(operationId: string): OutputPath {
    const path = operationId.split('.').map(p => lowerCaseFirstLetter(p));
    this.operationIdPathParts.push(path);
    return path;
  }

  createTypeName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = isSameFileContext(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return pascalCaseParts.join('');
  }

  createEnumName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = isSameFileContext(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return pascalCaseParts.join('');
  }

  createConstName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = isSameFileContext(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return lowerCaseFirstLetter(pascalCaseParts.join(''));
  }

  createFunctionName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string {
    const parts = isSameFileContext(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return lowerCaseFirstLetter(pascalCaseParts.join(''));
  }

  createOutputPathByComponentRef(componentRef: string): OutputPath {
    const pathStr = componentRef.replace('#/', '').split('/').join('.');
    return pathStr.split('.').map(p => lowerCaseFirstLetter(p));
  }

  createComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath
  ): string {
    const outputPath = this.createOutputPathByComponentRef(componentRef);
    return this.createTypeName(outputPath, referencingPath);
  }
}

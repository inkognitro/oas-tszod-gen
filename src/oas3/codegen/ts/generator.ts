import {
  areOutputPathsEqual,
  CodeGenerator,
  ComponentRefOutput,
  Output,
  OutputType,
  DefinitionOutput,
  doesOutputPathStartWithOtherOutputPath,
  OutputPath,
} from './core';
import {
  isSpecification,
  RequestByMethodMap,
  Specification,
} from '@oas3/specification';
import {applyEndpointCallerFunction} from '@oas3/codegen/ts/endpoint';
import {mkdirp} from 'mkdirp';
import {findTemplateOutput} from '@oas3/codegen/ts/template';
const fs = require('fs');

async function writeFile(path: string, content: string) {
  const dirPath = path.split('/').slice(0, -1).join('/');
  await mkdirp(dirPath);
  fs.writeFileSync(path, content);
}

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

function convertToKebabCase(str: string): string {
  return str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    (subStr, ofs) => (ofs ? '-' : '') + subStr.toLowerCase()
  );
}

function cleanUpFolderPath(path: string): string {
  return path
    .split('\\')
    .join('/')
    .split('/')
    .filter(p => p !== '/')
    .join('/');
}

export class DefaultCodeGenerator implements CodeGenerator {
  private readonly oas3Specs: Specification;
  private indirectOutputs: Output[];
  private operationIdOutputPaths: OutputPath[]; // todo: check if these are required

  constructor(oas3Specs: object) {
    if (!isSpecification(oas3Specs)) {
      throw new Error('invalid oas3 specification given');
    }
    this.oas3Specs = oas3Specs;
    this.indirectOutputs = [];
    this.operationIdOutputPaths = [];
  }

  generate(targetFolderPath: string) {
    this.indirectOutputs = [];
    this.operationIdOutputPaths = [];
    for (const path in this.oas3Specs.paths) {
      const requestByMethodMap = this.oas3Specs.paths[path];
      this.generateRequestRequestByMethodMapOutputs(path, requestByMethodMap);
    }
    const fileOutputByFilePath = this.createFileOutputByFilePath();
    this.createFiles(fileOutputByFilePath, targetFolderPath);
  }

  private createFiles(
    fileOutputByFilePath: FileOutputByFilePath,
    targetFolderPath: string
  ) {
    const cleanTargetFolderPath = cleanUpFolderPath(targetFolderPath);
    fs.cpSync(__dirname + '../../../../templates/ts', cleanTargetFolderPath, {
      recursive: true,
    });
    for (const filePath in fileOutputByFilePath) {
      const fileOutput = fileOutputByFilePath[filePath];
      const fsFilePath = `${cleanTargetFolderPath}${filePath}`;
      writeFile(fsFilePath, this.createFileContent(fileOutput)).then(() => {
        console.log(`created file: ${fsFilePath}`);
      });
    }
  }

  private createFileContent(fileOutput: FileOutput): string {
    const importContents: string[] = [];
    for (const importPath in fileOutput.importNamesByPath) {
      const importNames = fileOutput.importNamesByPath[importPath];
      if (!importNames.length) {
        continue;
      }
      importContents.push(
        `import {${importNames.join(', ')}} from '${importPath}';`
      );
    }
    const definitionContents: string[] = [];
    fileOutput.definitions.forEach(o => {
      switch (o.definitionType) {
        case 'function':
          definitionContents.push(
            `export function ${o.createName(o.path)}${o.createCode(o.path)}`
          );
          break;
        case 'const':
          definitionContents.push(
            `export const ${o.createName(o.path)} = ${o.createCode(o.path)}`
          );
          break;
        case 'enum':
          definitionContents.push(
            `export enum ${o.createName(o.path)} ${o.createCode(o.path)}`
          );
          break;
        case 'type':
          definitionContents.push(
            `export type ${o.createName(o.path)} = ${o.createCode(o.path)}`
          );
          break;
        default:
          throw new Error(`output type "${o.definitionType}" is not supported`);
      }
    });
    let content = importContents.join('\n');
    if (importContents.length && definitionContents.length) {
      content += '\n\n\n';
    }
    content += definitionContents.join('\n\n');
    return content;
  }

  private generateRequestRequestByMethodMapOutputs(
    path: string,
    requestByMethodMap: RequestByMethodMap
  ) {
    for (const method in requestByMethodMap) {
      const requestSchema = requestByMethodMap[method];
      const endpointId = {path, method};
      applyEndpointCallerFunction(this, endpointId, requestSchema);
      this.operationIdOutputPaths.push(
        this.createOperationIdOutputPath(requestSchema.operationId)
      );
    }
  }

  private createFilePathFromOutputPath(outputPath: OutputPath): string {
    if (outputPath.length < 2) {
      throw new Error(`invalid outputPath: ${JSON.stringify(outputPath)}`);
    }
    const operationIdFilePath = this.operationIdOutputPaths.find(
      operationIdFilePath =>
        doesOutputPathStartWithOtherOutputPath(outputPath, operationIdFilePath)
    );
    if (operationIdFilePath) {
      const folders = operationIdFilePath.slice(0, -1);
      const fileName = lowerCaseFirstLetter(
        operationIdFilePath[operationIdFilePath.length - 1]
      );
      return `/${convertToKebabCase(folders.join('/'))}/${fileName}.ts`;
    }
    const folders = outputPath.slice(0, -1);
    const fileName = lowerCaseFirstLetter(outputPath[outputPath.length - 1]);
    return `/${convertToKebabCase(folders.join('/'))}/${fileName}.ts`;
  }

  private createRelativeImportPath(
    localOutputPath: OutputPath,
    refOutputPath: OutputPath
  ): string {
    const targetFilePath = this.createFilePathFromOutputPath(localOutputPath);
    const refFilePath = this.createFilePathFromOutputPath(refOutputPath);
    if (targetFilePath === refFilePath) {
      throw new Error(
        'same filePath cases should have been handled before calling this function'
      );
    }
    const targetFileName = targetFilePath.split('/').slice(-1).join('');
    const targetFolderPathParts = targetFilePath.split('/').slice(0, -1);
    const targetFolderPath = targetFolderPathParts.join('/');
    const refFolderPathParts = refFilePath.split('/').slice(0, -1);
    const refFolderPath = refFolderPathParts.join('/');
    if (targetFolderPath === refFolderPath) {
      const targetFileNameParts = targetFileName.split('.ts');
      return `./${targetFileNameParts[0]}`;
    }
    let relativePath = '../';
    let commonIndex = refFolderPathParts.length - 1;
    for (let index = refFolderPathParts.length - 1; index >= 0; index--) {
      const refPathPrefixParts = refFolderPathParts.slice(0, index);
      const targetPathPrefixParts = targetFolderPathParts.slice(0, index);
      if (!areOutputPathsEqual(targetPathPrefixParts, refPathPrefixParts)) {
        relativePath += '../';
        continue;
      }
      commonIndex = index;
      break;
    }
    const relativePathPartsToTarget = targetFolderPathParts.slice(commonIndex);
    return `${relativePath}${relativePathPartsToTarget.join('/')}`;
  }

  private isSameOutputFile(outputPath1: OutputPath, outputPath2: OutputPath) {
    const filePath1 = this.createFilePathFromOutputPath(outputPath1);
    const filePath2 = this.createFilePathFromOutputPath(outputPath2);
    return filePath1 === filePath2;
  }

  private addImportsToFileOutputByFilePath(
    availableOutputs: Output[],
    fileOutput: FileOutput,
    output: Output
  ): FileOutput {
    let nextFileOutput = fileOutput;
    output.requiredOutputPaths.forEach(requiredOutputPath => {
      let requiredOutput = availableOutputs.find(o =>
        areOutputPathsEqual(o.path, requiredOutputPath)
      );
      if (!requiredOutput) {
        requiredOutput = findTemplateOutput(requiredOutputPath);
      }
      if (!requiredOutput) {
        console.log(
          'could not find output by path: ' + requiredOutputPath.join('.')
        );
        return;
      }
      if (this.isSameOutputFile(requiredOutput.path, output.path)) {
        return;
      }
      const importName = requiredOutput.createName(requiredOutput.path);
      const importPath = this.createRelativeImportPath(
        requiredOutput.path,
        output.path
      );
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

  private createFileOutputByFilePath(): FileOutputByFilePath {
    const fileOutputByFilePath: FileOutputByFilePath = {};
    this.indirectOutputs.forEach(output => {
      const filePath = this.createFilePathFromOutputPath(output.path);
      let fileOutput: FileOutput = fileOutputByFilePath[filePath] ?? {
        importNamesByPath: {},
        definitions: [],
      };
      fileOutput = this.addImportsToFileOutputByFilePath(
        this.indirectOutputs,
        fileOutput,
        output
      );
      switch (output.type) {
        case OutputType.COMPONENT_REF:
          break;
        case OutputType.DEFINITION:
          fileOutput = {
            ...fileOutput,
            definitions: [...fileOutput.definitions, output],
          };
          break;
        default:
          // @ts-ignore
          throw new Error(`type "${output.type}" is not supported`);
      }
      fileOutputByFilePath[filePath] = fileOutput;
    });
    return fileOutputByFilePath;
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
    for (const index in this.operationIdOutputPaths) {
      const operationIdPathPart = this.operationIdOutputPaths[index];
      if (
        doesOutputPathStartWithOtherOutputPath(outputPath, operationIdPathPart)
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
    for (const index in this.operationIdOutputPaths) {
      const operationIdPathPart = this.operationIdOutputPaths[index];
      if (
        doesOutputPathStartWithOtherOutputPath(outputPath, operationIdPathPart)
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
    this.operationIdOutputPaths.push(path);
    return path;
  }

  createTypeName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = this.isSameOutputFile(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return pascalCaseParts.join('');
  }

  createEnumName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = this.isSameOutputFile(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return pascalCaseParts.join('');
  }

  createConstName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = this.isSameOutputFile(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return lowerCaseFirstLetter(pascalCaseParts.join(''));
  }

  createFunctionName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string {
    const parts = this.isSameOutputFile(outputPath, referencingPath)
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

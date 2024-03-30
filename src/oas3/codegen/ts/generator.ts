import {
  areOutputPathsEqual,
  CodeGenerator,
  ComponentRefOutput,
  DefinitionOutput,
  doesOutputPathStartWithOtherOutputPath,
  Output,
  OutputPath,
  OutputType,
} from './core';
import {
  isSpecification,
  parameterComponentRefPrefix,
  RequestByMethodMap,
  responseComponentRefPrefix,
  schemaComponentRefPrefix,
  Specification,
} from '@oas3/specification';
import {applyEndpointCallerFunction} from '@oas3/codegen/ts/endpoint';
import {mkdirp} from 'mkdirp';
import {findTemplateOutput} from '@oas3/codegen/ts/template';
import {applySchema} from '@oas3/codegen/ts/schema';

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

type ImportAsset = {
  name: string;
  importAsName: string;
};

type ImportAssetsByPath = {
  [path: string]: ImportAsset[];
};

type FileOutput = {
  importAssetsByPath: ImportAssetsByPath;
  definitions: DefinitionOutput[];
  exportPaths: string[];
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

const componentParametersFileNameOutputPathPart = 'parameters6b3a7814';
const componentResponsesFileNameOutputPathPart = 'responses6b3a7814';
const componentSchemasFileNameOutputPathPart = 'schemas6b3a7814';

type GenerateConfig = {
  targetFolderPath: string;
  importRootAlias?: string;
};

export class DefaultCodeGenerator implements CodeGenerator {
  private readonly oas3Specs: Specification;
  private indirectOutputs: Output[];
  private operationOutputPaths: OutputPath[];

  constructor(oas3Specs: object) {
    if (!isSpecification(oas3Specs)) {
      throw new Error('invalid oas3 specification given');
    }
    this.oas3Specs = oas3Specs;
    this.indirectOutputs = [];
    this.operationOutputPaths = [];
  }

  generate(config: GenerateConfig) {
    this.indirectOutputs = [];
    this.initializeOperationOutputPaths();
    for (const path in this.oas3Specs.paths) {
      const requestByMethodMap = this.oas3Specs.paths[path];
      this.generateRequestByMethodMapOutputs(path, requestByMethodMap);
    }
    this.generateComponentOutputs();
    const fileOutputByFilePath = this.createFileOutputByFilePath(config);
    this.createFiles(fileOutputByFilePath, config);
  }

  private initializeOperationOutputPaths() {
    this.operationOutputPaths = [];
    for (const path in this.oas3Specs.paths) {
      const requestByMethodMap = this.oas3Specs.paths[path];
      for (const method in requestByMethodMap) {
        const request = requestByMethodMap[method];
        const outputPath = this.createOperationOutputPath(request.operationId);
        this.operationOutputPaths.push(outputPath);
      }
    }
  }

  private createFiles(
    fileOutputByFilePath: FileOutputByFilePath,
    config: GenerateConfig
  ) {
    const cleanTargetFolderPath = cleanUpFolderPath(config.targetFolderPath);
    fs.cpSync(__dirname + '../../../../templates/ts', cleanTargetFolderPath, {
      recursive: true,
    });
    for (const filePath in fileOutputByFilePath) {
      const fileOutput = fileOutputByFilePath[filePath];
      const fsFilePath = `${cleanTargetFolderPath}${filePath}`;
      writeFile(fsFilePath, this.createFileContent(fileOutput)).then(() => {
        // console.log(`created file: ${fsFilePath}`); // todo: reimplement
      });
    }
  }

  private createFileContent(fileOutput: FileOutput): string {
    const importContents: string[] = [];
    for (const importPath in fileOutput.importAssetsByPath) {
      const importAssets = fileOutput.importAssetsByPath[importPath];
      if (!importAssets.length) {
        continue;
      }
      const importStatements = importAssets.map(a => {
        if (a.importAsName === a.name) {
          return a.name;
        }
        return `${a.name} as ${a.importAsName}`;
      });
      importContents.push(
        `import {${importStatements.join(', ')}} from '${importPath}';`
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

    const exportContents: string[] = [];
    fileOutput.exportPaths.forEach(path => {
      exportContents.push(`export * from '${path}';`);
    });

    const contentParts: string[] = [];
    if (importContents.length) {
      contentParts.push(importContents.join('\n'));
    }
    if (definitionContents.length) {
      contentParts.push(definitionContents.join('\n\n'));
    }
    if (exportContents.length) {
      contentParts.push(exportContents.join('\n'));
    }

    return contentParts.join('\n\n');
  }

  private generateComponentOutputs() {
    const outputPathsToConsider = this.indirectOutputs.reduce<OutputPath[]>(
      (allOutputPaths, output) => {
        const outputPathsToAdd = output.requiredOutputPaths.filter(p => {
          return !allOutputPaths.find(sp => areOutputPathsEqual(sp, p));
        });
        return [...allOutputPaths, ...outputPathsToAdd];
      },
      []
    );
    const components = this.oas3Specs.components;
    for (const schemaName in components.schemas) {
      const refStr = `${schemaComponentRefPrefix}${schemaName}`;
      const schema = components.schemas[schemaName];
      const outputPath = this.createOutputPathByComponentRef(refStr);
      const shouldOutputBeAdded = !!outputPathsToConsider.find(op =>
        areOutputPathsEqual(op, outputPath)
      );
      if (!shouldOutputBeAdded) {
        continue;
      }
      const generationSummary = applySchema(this, schema, outputPath);
      const typeDefinition: DefinitionOutput = {
        type: OutputType.DEFINITION,
        ...generationSummary,
        definitionType: 'type',
        createName: referencingPath =>
          this.createComponentTypeName(refStr, referencingPath),
      };
      this.addIndirectOutput(typeDefinition);
    }
    for (const parameterName in components.parameters) {
      const refStr = `${parameterComponentRefPrefix}${parameterName}`;
      const requestParameter = components.parameters[parameterName];
      const outputPath = this.createOutputPathByComponentRef(refStr);
      const shouldOutputBeAdded = !!outputPathsToConsider.find(op =>
        areOutputPathsEqual(op, outputPath)
      );
      if (!shouldOutputBeAdded) {
        continue;
      }
      const generationSummary = applySchema(
        this,
        requestParameter.schema,
        outputPath
      );
      const typeDefinition: DefinitionOutput = {
        type: OutputType.DEFINITION,
        ...generationSummary,
        definitionType: 'type',
        createName: referencingPath =>
          this.createComponentTypeName(refStr, referencingPath),
      };
      this.addIndirectOutput(typeDefinition);
    }
    for (const responseName in components.responses) {
      const refStr = `${responseComponentRefPrefix}${responseName}`;
      const response = components.responses[responseName];
      const jsonResponse = response.content['application/json'];
      if (!jsonResponse) {
        continue;
      }
      const outputPath = this.createOutputPathByComponentRef(refStr);
      const shouldOutputBeAdded = !!outputPathsToConsider.find(op =>
        areOutputPathsEqual(op, outputPath)
      );
      if (!shouldOutputBeAdded) {
        continue;
      }
      const generationSummary = applySchema(
        this,
        jsonResponse.schema,
        outputPath
      );
      const typeDefinition: DefinitionOutput = {
        type: OutputType.DEFINITION,
        ...generationSummary,
        definitionType: 'type',
        createName: referencingPath =>
          this.createComponentTypeName(refStr, referencingPath),
      };
      this.addIndirectOutput(typeDefinition);
    }
  }

  private generateRequestByMethodMapOutputs(
    path: string,
    requestByMethodMap: RequestByMethodMap
  ) {
    for (const method in requestByMethodMap) {
      const requestSchema = requestByMethodMap[method];
      const endpointId = {path, method};
      applyEndpointCallerFunction(this, endpointId, requestSchema);
    }
  }

  private createFolderOutputPathFromOutputPath(
    outputPath: OutputPath
  ): OutputPath {
    if (outputPath.length < 2) {
      throw new Error(
        `output path should contain at least two output path parts: ${JSON.stringify(
          outputPath
        )}`
      );
    }
    const folderOutputPath =
      this.findMostAccurateOperationFolderOutputPath(outputPath);
    if (!folderOutputPath) {
      return outputPath.slice(0, 1);
    }
    return folderOutputPath;
  }

  private createFilePathFromOutputPath(outputPath: OutputPath): string {
    const folderOutputPath =
      this.createFolderOutputPathFromOutputPath(outputPath);
    const folders = folderOutputPath.map(p => convertToKebabCase(p));
    let fileName = lowerCaseFirstLetter(outputPath[folders.length]);
    if (fileName === componentParametersFileNameOutputPathPart) {
      fileName = 'parameters';
    } else if (fileName === componentResponsesFileNameOutputPathPart) {
      fileName = 'responses';
    } else if (fileName === componentSchemasFileNameOutputPathPart) {
      fileName = 'schemas';
    }
    return `/${folders.join('/')}/${fileName}.ts`;
  }

  private createImportPath(
    localOutputPath: OutputPath,
    refOutputPath: OutputPath,
    config: GenerateConfig
  ): string {
    const targetFilePath = this.createFilePathFromOutputPath(localOutputPath);
    const targetFolderPathParts = targetFilePath.split('/').slice(0, -1);
    if (config.importRootAlias) {
      return `${config.importRootAlias}${targetFolderPathParts.join('/')}`;
    }
    const refFilePath = this.createFilePathFromOutputPath(refOutputPath);
    if (targetFilePath === refFilePath) {
      throw new Error(
        'same filePath cases should have been handled before calling this function'
      );
    }
    const targetFileName = targetFilePath.split('/').slice(-1).join('');
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

  private isSameOutputFolder(outputPath1: OutputPath, outputPath2: OutputPath) {
    const folderPath1 = this.createFolderOutputPathFromOutputPath(outputPath1);
    const folderPath2 = this.createFolderOutputPathFromOutputPath(outputPath2);
    return areOutputPathsEqual(folderPath1, folderPath2);
  }

  private addImportsToFileOutput(
    fileOutput: FileOutput,
    output: Output,
    config: GenerateConfig
  ): FileOutput {
    const availableOutputs = this.indirectOutputs;
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
          `could not find output by path "${requiredOutputPath.join(
            '.'
          )}", referenced by path "${output.path.join('.')}"`
        );
        return;
      }
      if (this.isSameOutputFile(requiredOutput.path, output.path)) {
        return;
      }
      const importAsset: ImportAsset = {
        name: requiredOutput.createName(requiredOutput.path),
        importAsName: requiredOutput.createName(output.path),
      };
      const importPath = this.createImportPath(
        requiredOutput.path,
        output.path,
        config
      );
      const importAssets = nextFileOutput.importAssetsByPath[importPath] ?? [];
      const isAssetAlreadyConsidered = !!importAssets.find(
        a => a.importAsName === importAsset.importAsName
      );
      if (isAssetAlreadyConsidered) {
        return;
      }
      nextFileOutput = {
        ...nextFileOutput,
        importAssetsByPath: {
          ...nextFileOutput.importAssetsByPath,
          [importPath]: [...importAssets, importAsset],
        },
      };
    });
    return nextFileOutput;
  }

  private createFileOutputByFilePath(
    config: GenerateConfig
  ): FileOutputByFilePath {
    const fileOutputByFilePath: FileOutputByFilePath = {};
    this.indirectOutputs.forEach(output => {
      const filePath = this.createFilePathFromOutputPath(output.path);
      let fileOutput: FileOutput = fileOutputByFilePath[filePath] ?? {
        importAssetsByPath: {},
        definitions: [],
        exportPaths: [],
      };
      fileOutput = this.addImportsToFileOutput(fileOutput, output, config);
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
    return this.getFileOutputByFilePathWithAddedIndexFiles(
      fileOutputByFilePath
    );
  }

  private getFileOutputByFilePathWithAddedIndexFiles(
    fileOutputByFilePath: FileOutputByFilePath
  ): FileOutputByFilePath {
    let nextFileOutputByFilePath = fileOutputByFilePath;
    for (const filePath in fileOutputByFilePath) {
      const folderPath = filePath.split('/').slice(0, -1).join('/');
      const indexFilePath = `${folderPath}/index.ts`;
      if (!fileOutputByFilePath[indexFilePath]) {
        nextFileOutputByFilePath = {
          ...nextFileOutputByFilePath,
          [indexFilePath]: this.createFileOutputForIndexTsFile(
            folderPath,
            fileOutputByFilePath
          ),
        };
      }
    }
    return nextFileOutputByFilePath;
  }

  private createFileOutputForIndexTsFile(
    folderPath: string,
    fileOutputByFilePath: FileOutputByFilePath
  ): FileOutput {
    const exportPaths: string[] = [];
    for (const filePath in fileOutputByFilePath) {
      const fileFolderPath = filePath.split('/').slice(0, -1).join('/');
      if (folderPath === fileFolderPath) {
        const exportPath = filePath
          .split('/')
          .slice(-1)
          .join('')
          .split('.ts')[0];
        exportPaths.push(`./${exportPath}`);
      }
    }
    return {
      importAssetsByPath: {},
      definitions: [],
      exportPaths,
    };
  }

  addIndirectOutput(output: Output) {
    switch (output.type) {
      case OutputType.COMPONENT_REF:
        // eslint-disable-next-line no-case-declarations
        const conflictingOutput: ComponentRefOutput | undefined =
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
          }) as undefined | ComponentRefOutput;
        if (conflictingOutput) {
          throw new Error(
            `conflicting "objectDiscriminatorConfig" property for type ComponentRefOutput with componentName "${output.componentRef}":` +
              `${JSON.stringify(
                output.objectDiscriminatorConfig
              )} Vs. ${JSON.stringify(
                conflictingOutput.objectDiscriminatorConfig
              )}`
          );
        }
        this.indirectOutputs.push(output);
        break;
      case OutputType.DEFINITION:
        // eslint-disable-next-line no-case-declarations
        const outputWithSamePath = this.indirectOutputs.find(
          o =>
            o.type !== OutputType.COMPONENT_REF &&
            areOutputPathsEqual(o.path, output.path)
        );
        if (outputWithSamePath) {
          throw new Error(
            `ambiguous definitions for outputPath: ${JSON.stringify(
              output.path
            )}"`
          );
        }
        this.indirectOutputs.push(output);
        break;
      default:
        // @ts-ignore
        throw new Error(`output.type "${output.type}" is not supported`);
    }
  }

  private getOutputPathWithoutFolderOutputPathParts(
    outputPath: OutputPath
  ): OutputPath {
    const folderOutputPath =
      this.createFolderOutputPathFromOutputPath(outputPath);
    return outputPath.slice(folderOutputPath.length);
  }

  createOperationOutputPath(operationId: string): OutputPath {
    return operationId.split('.').map(p => lowerCaseFirstLetter(p));
  }

  createTypeName(outputPath: OutputPath, referencingPath: OutputPath): string {
    let parts = this.isSameOutputFolder(outputPath, referencingPath)
      ? this.getOutputPathWithoutFolderOutputPathParts(outputPath)
      : outputPath;
    parts = parts.filter(
      p =>
        p !== componentSchemasFileNameOutputPathPart &&
        p !== componentParametersFileNameOutputPathPart &&
        p !== componentResponsesFileNameOutputPathPart
    );
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return pascalCaseParts.join('');
  }

  createEnumName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = this.isSameOutputFolder(outputPath, referencingPath)
      ? this.getOutputPathWithoutFolderOutputPathParts(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return pascalCaseParts.join('');
  }

  createConstName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = this.isSameOutputFolder(outputPath, referencingPath)
      ? this.getOutputPathWithoutFolderOutputPathParts(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return lowerCaseFirstLetter(pascalCaseParts.join(''));
  }

  createFunctionName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string {
    const parts = this.isSameOutputFolder(outputPath, referencingPath)
      ? this.getOutputPathWithoutFolderOutputPathParts(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return lowerCaseFirstLetter(pascalCaseParts.join(''));
  }

  private findMostAccurateOperationFolderOutputPath(
    outputPath: OutputPath
  ): null | OutputPath {
    let mostAccurateFolderOutputPath: null | OutputPath = null;
    this.operationOutputPaths.forEach(p => {
      const folderOutputPath = p.slice(0, -1);
      if (
        !doesOutputPathStartWithOtherOutputPath(outputPath, folderOutputPath)
      ) {
        return;
      }
      if (mostAccurateFolderOutputPath === null) {
        mostAccurateFolderOutputPath = folderOutputPath;
        return;
      }
      if (mostAccurateFolderOutputPath.length < folderOutputPath.length) {
        mostAccurateFolderOutputPath = folderOutputPath;
      }
    });
    return mostAccurateFolderOutputPath;
  }

  createOutputPathByComponentRef(componentRef: string): OutputPath {
    const outputPathParts: OutputPath = componentRef
      .replace(parameterComponentRefPrefix, '')
      .replace(responseComponentRefPrefix, '')
      .replace(schemaComponentRefPrefix, '')
      .split('.')
      .map(p => lowerCaseFirstLetter(p));
    if (outputPathParts.length < 2) {
      throw new Error(
        `componentRef "${componentRef}" should at least be divided into two parts (by a dot).`
      );
    }
    let folderOutputPathParts =
      this.findMostAccurateOperationFolderOutputPath(outputPathParts);
    if (!folderOutputPathParts) {
      folderOutputPathParts = outputPathParts.slice(0, 1);
    }
    const typeNamePathParts = outputPathParts.slice(
      folderOutputPathParts.length
    );
    let fileNameOutputPathPart: string | null = null;
    if (componentRef.startsWith(parameterComponentRefPrefix)) {
      fileNameOutputPathPart = componentParametersFileNameOutputPathPart;
    } else if (componentRef.startsWith(responseComponentRefPrefix)) {
      fileNameOutputPathPart = componentResponsesFileNameOutputPathPart;
    } else if (componentRef.startsWith(schemaComponentRefPrefix)) {
      fileNameOutputPathPart = componentSchemasFileNameOutputPathPart;
    }
    if (!fileNameOutputPathPart) {
      throw new Error(`componentRef "${componentRef}" is not supported`);
    }
    return [
      ...folderOutputPathParts,
      fileNameOutputPathPart,
      ...typeNamePathParts,
    ];
  }

  createComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath
  ): string {
    const outputPath = this.createOutputPathByComponentRef(componentRef);
    return this.createTypeName(outputPath, referencingPath);
  }
}

import {
  areOutputPathsEqual,
  arraySchemaItemOutputPathPart,
  capitalizeFirstLetter,
  CodeGenerator,
  DefinitionOutput,
  doesOutputPathStartWithOtherOutputPath,
  GeneratedDefinitionOutput,
  lowerCaseFirstLetter,
  objectSchemaAdditionalPropsOutputPathPart,
  oneOfSchemaItemOutputPathPart,
  Output,
  OutputPath,
  OutputType,
  TemplateDefinitionOutput,
} from './core';
import {
  isParameterComponentRef,
  isResponseComponentRef,
  isSchemaComponentRef,
  isSpecification,
  Parameter,
  parameterComponentRefPrefix,
  RequestByMethodMap,
  responseComponentRefPrefix,
  Schema,
  schemaComponentRefPrefix,
  Specification,
  Response,
} from '@oas3/specification';
import {
  applyEndpointCallerFunction,
  requestResultOutputPathPart,
  responseOutputPathPart,
} from './endpoint';
import {mkdirp} from 'mkdirp';
import {templateDefinitionOutputs, templateZOfZodLibrary} from './template';
import {applySchema} from './schema';
import {applyZodSchema} from '@oas3/codegen/ts/zodSchema';

const fs = require('fs');
const path = require('path');

function removeDirectoryRecursively(path: string) {
  if (!fs.existsSync(path)) {
    return;
  }
  fs.readdirSync(path).forEach((file: string) => {
    const curPath = path + '/' + file;
    if (fs.lstatSync(curPath).isDirectory()) {
      removeDirectoryRecursively(curPath);
    } else {
      fs.unlinkSync(curPath);
    }
  });
  fs.rmdirSync(path);
}

async function writeFile(path: string, content: string) {
  const dirPath = path.split('\\').join('/').split('/').slice(0, -1).join('/');
  await mkdirp(dirPath);
  fs.writeFileSync(path, content);
}

async function appendToFile(path: string, content: string) {
  const dirPath = path.split('\\').join('/').split('/').slice(0, -1).join('/');
  await mkdirp(dirPath);
  fs.appendFileSync(path, content);
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
    .filter(p => p !== '')
    .join('/');
}

const componentParametersFileNameOutputPathPart = 'parameters6b3a7814';
const componentResponsesFileNameOutputPathPart = 'responses6b3a7814';
const componentSchemasFileNameOutputPathPart = 'schemas6b3a7814';

export interface Logger {
  log(...data: unknown[]): void;
}

type RequestHandlerName =
  | 'AuthRequestHandler'
  | 'AxiosRequestHandler'
  | 'FetchApiRequestHandler'
  | 'ScopedRequestHandler'
  | 'ZodValidationRequestHandler';

type TemplateFileInfo = {
  fileName: string;
  folderPath: string;
  requestHandlerName: RequestHandlerName;
};

const templateCoreFileInfos: TemplateFileInfo[] = [
  {
    fileName: 'fetchApiRequestHandler.ts',
    folderPath: '/core',
    requestHandlerName: 'FetchApiRequestHandler',
  },
  {
    fileName: 'axiosRequestHandler.ts',
    folderPath: '/core',
    requestHandlerName: 'AxiosRequestHandler',
  },
  {
    fileName: 'authRequestHandler.ts',
    folderPath: '/core',
    requestHandlerName: 'AuthRequestHandler',
  },
  {
    fileName: 'scopedRequestHandler.ts',
    folderPath: '/core',
    requestHandlerName: 'ScopedRequestHandler',
  },
  {
    fileName: 'zodValidationRequestHandler.ts',
    folderPath: '/core',
    requestHandlerName: 'ZodValidationRequestHandler',
  },
];

export type RequestHandlersGenerateConfig = RequestHandlerName[];

export type GenerateConfig = {
  outputFolderPath: string;
  importRootAlias?: string;
  predefinedFolderOutputPaths?: OutputPath[];
  withZod: boolean;
  requestHandlers?: RequestHandlersGenerateConfig;
};

export class DefaultCodeGenerator implements CodeGenerator {
  private readonly oas3Specs: Specification;
  private readonly logger: Logger;
  private outputs: Output[];
  private operationFolderOutputPaths: OutputPath[];

  constructor(oas3Specs: object, logger: Logger) {
    if (!isSpecification(oas3Specs)) {
      throw new Error('invalid oas3 specification given');
    }
    this.oas3Specs = oas3Specs;
    this.logger = logger;
    this.outputs = [];
    this.operationFolderOutputPaths = [];
  }

  generate(config: GenerateConfig) {
    this.resetOutputs();
    this.resetOperationFolderOutputPaths(config);
    for (const path in this.oas3Specs.paths) {
      const requestByMethodMap = this.oas3Specs.paths[path];
      this.generateRequestByMethodMapOutputs(path, requestByMethodMap, config);
    }
    const fileOutputByFilePath = this.createFileOutputByFilePath(config);
    this.createFiles(fileOutputByFilePath, config);
  }

  private resetOutputs() {
    this.outputs = [...templateDefinitionOutputs];
  }

  private resetOperationFolderOutputPaths(config: GenerateConfig) {
    this.operationFolderOutputPaths = [
      ['core'],
      ...(config.predefinedFolderOutputPaths ?? []),
    ];
    for (const path in this.oas3Specs.paths) {
      const requestByMethodMap = this.oas3Specs.paths[path];
      for (const method in requestByMethodMap) {
        const request = requestByMethodMap[method];
        const outputPath = this.createOperationOutputPath(request.operationId);
        if (outputPath.length < 2) {
          continue;
        }
        const folderOutputPath = outputPath.slice(0, -1);
        this.operationFolderOutputPaths.push(folderOutputPath);
      }
    }
  }

  private getTemplateFileInfosToGenerate(
    config: GenerateConfig
  ): TemplateFileInfo[] {
    const fileInfos = templateCoreFileInfos.filter(
      fileInfo =>
        config.withZod ||
        fileInfo.requestHandlerName !== 'ZodValidationRequestHandler'
    );
    return fileInfos.filter(
      f =>
        !config.requestHandlers ||
        config.requestHandlers.includes(f.requestHandlerName)
    );
  }

  private createTemplateFileOutputByFilePath(
    config: GenerateConfig
  ): FileOutputByFilePath {
    const templateFileInfos = this.getTemplateFileInfosToGenerate(config);
    if (!templateFileInfos.length) {
      return {};
    }
    const fileOutputByFilePath: FileOutputByFilePath = {};
    const coreFolderTemplateFileInfos = templateFileInfos.filter(
      fileInfo => fileInfo.folderPath === '/core'
    );
    if (coreFolderTemplateFileInfos.length) {
      fileOutputByFilePath['/core/index.ts'] = {
        definitions: [],
        importAssetsByPath: {},
        exportPaths: coreFolderTemplateFileInfos.map(
          f => `./${f.fileName.split('.ts')[0]}`
        ),
      };
    }
    return fileOutputByFilePath;
  }

  private copyTemplateFiles(config: GenerateConfig) {
    const templateFileInfos = this.getTemplateFileInfosToGenerate(config);
    templateFileInfos.forEach(fileInfo => {
      fs.cpSync(
        path.resolve(
          __dirname,
          '../../../templates/ts',
          cleanUpFolderPath(fileInfo.folderPath),
          fileInfo.fileName
        ),
        path.resolve(
          config.outputFolderPath,
          cleanUpFolderPath(fileInfo.folderPath),
          fileInfo.fileName
        )
      );
    });
  }

  private createFiles(
    fileOutputByFilePath: FileOutputByFilePath,
    config: GenerateConfig
  ) {
    const cleanTargetFolderPath = cleanUpFolderPath(config.outputFolderPath);
    removeDirectoryRecursively(cleanTargetFolderPath);
    this.copyTemplateFiles(config);
    for (const filePath in fileOutputByFilePath) {
      const fileOutput = fileOutputByFilePath[filePath];
      const fsFilePath = path.resolve(
        config.outputFolderPath,
        cleanUpFolderPath(filePath)
      );
      if (fs.existsSync(fsFilePath)) {
        appendToFile(
          fsFilePath,
          this.createFileContent(fileOutput, config)
        ).then(() => {
          this.logger.log(`extended file: ${fsFilePath}`);
        });
        continue;
      }
      writeFile(fsFilePath, this.createFileContent(fileOutput, config)).then(
        () => {
          this.logger.log(`created file: ${fsFilePath}`);
        }
      );
    }
  }

  private createDeclarationForGeneratedDefinitionOutput(
    o: GeneratedDefinitionOutput
  ): string {
    switch (o.definitionType) {
      case 'function':
        return `export function ${o.createName(o.path)}${o.createCode(o.path)}`;
      case 'const':
        return `export const ${o.createName(o.path)} = ${o.createCode(o.path)}`;
      case 'type':
        return `export type ${o.createName(o.path)} = ${o.createCode(o.path)}`;
      case 'interface':
        return `export interface ${o.createName(o.path)} ${o.createCode(
          o.path
        )}`;
      default:
        throw new Error(`output type "${o.definitionType}" is not supported`);
    }
  }

  private createDeclarationForTemplateDefinitionOutput(
    o: TemplateDefinitionOutput,
    config: GenerateConfig
  ): null | string {
    if (!o.createCode) {
      return null;
    }
    const genericsDeclarationCode = o.createGenericsDeclarationCode
      ? `<${o.createGenericsDeclarationCode()}>`
      : '';
    switch (o.definitionType) {
      case 'function':
        return `export function ${o.createName(
          o.path
        )}${genericsDeclarationCode}${o.createCode(config, o.path)}`;
      case 'const':
        return `export const ${o.createName(o.path)} = ${o.createCode(
          config,
          o.path
        )}`;
      case 'type':
        return `export type ${o.createName(
          o.path
        )}${genericsDeclarationCode} = ${o.createCode(config, o.path)}`;
      case 'interface':
        return `export interface ${o.createName(
          o.path
        )}${genericsDeclarationCode} ${o.createCode(config, o.path)}`;
      default:
        throw new Error(`output type "${o.definitionType}" is not supported`);
    }
  }

  private createFileContent(
    fileOutput: FileOutput,
    config: GenerateConfig
  ): string {
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
      switch (o.type) {
        case OutputType.DEFINITION:
          definitionContents.push(
            this.createDeclarationForGeneratedDefinitionOutput(o)
          );
          break;
        case OutputType.TEMPLATE_DEFINITION:
          // eslint-disable-next-line no-case-declarations
          const templateCode =
            this.createDeclarationForTemplateDefinitionOutput(o, config);
          if (templateCode) {
            definitionContents.push(templateCode);
          }
          break;
        default:
          // @ts-ignore
          throw new Error(`output type "${o.type}" is not supported`);
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

  private findOutputByOutputPath(outputPath: OutputPath): null | Output {
    return (
      this.outputs.find(
        o =>
          o.type !== OutputType.COMPONENT_REF &&
          areOutputPathsEqual(o.path, outputPath)
      ) ?? null
    );
  }

  private addOutputByResponseComponentRef(
    componentRef: string,
    config: GenerateConfig
  ) {
    const outputPath = this.createOutputPathByComponentRef(componentRef);
    if (this.findOutputByOutputPath(outputPath)) {
      return;
    }
    const schema = this.findComponentResponseByRef(componentRef);
    if (!schema) {
      const output: DefinitionOutput = {
        type: OutputType.DEFINITION,
        definitionType: 'type',
        createCode: () => {
          return 'any';
        },
        path: outputPath,
        createName: referencingPath =>
          this.createComponentTypeName(componentRef, referencingPath),
        getRequiredOutputPaths: () => [],
      };
      this.addOutput(output, config);
      return;
    }
    // todo: implement
  }

  private addOutputByParameterComponentRef(
    componentRef: string,
    config: GenerateConfig
  ) {
    const outputPath = this.createOutputPathByComponentRef(componentRef);
    if (this.findOutputByOutputPath(outputPath)) {
      return;
    }
    const schema = this.findComponentParameterByRef(componentRef);
    if (!schema) {
      const output: DefinitionOutput = {
        type: OutputType.DEFINITION,
        definitionType: 'type',
        createCode: () => {
          return 'any';
        },
        path: outputPath,
        createName: referencingPath =>
          this.createComponentTypeName(componentRef, referencingPath),
        getRequiredOutputPaths: () => [],
      };
      this.addOutput(output, config);
      return;
    }
    // todo: implement
  }

  private addOutputBySchemaComponentRef(
    componentRef: string,
    config: GenerateConfig
  ) {
    const outputPath = this.createOutputPathByComponentRef(componentRef);
    const outputPathZodSchema =
      this.createOutputPathByComponentRefForZodSchema(componentRef);
    if (this.findOutputByOutputPath(outputPath)) {
      return;
    }
    const schema = this.findComponentSchemaByRef(componentRef);
    if (!schema) {
      const output: DefinitionOutput = {
        type: OutputType.DEFINITION,
        definitionType: 'type',
        createCode: () => {
          return 'any';
        },
        path: outputPath,
        createName: referencingPath =>
          this.createComponentTypeName(componentRef, referencingPath),
        getRequiredOutputPaths: () => [],
      };
      this.addOutput(output, config);
      if (config.withZod) {
        const zodSchemaOutput: DefinitionOutput = {
          type: OutputType.DEFINITION,
          definitionType: 'const',
          path: outputPathZodSchema,
          createName: referencingPath =>
            this.createComponentZodSchemaName(componentRef, referencingPath),
          createCode: () => {
            return 'z.any()';
          },
          getRequiredOutputPaths: () => [templateZOfZodLibrary.path],
        };
        this.addOutput(zodSchemaOutput, config);
      }
      return;
    }
    const output: DefinitionOutput = {
      type: OutputType.DEFINITION,
      ...applySchema(this, schema, outputPath, config, [componentRef]),
      definitionType: 'type',
      createName: referencingPath =>
        this.createComponentTypeName(componentRef, referencingPath),
    };
    this.addOutput(output, config);
    if (config.withZod) {
      const zodSchemaOutput: DefinitionOutput = {
        type: OutputType.DEFINITION,
        definitionType: 'const',
        createName: referencingPath =>
          this.createComponentZodSchemaName(componentRef, referencingPath),
        ...applyZodSchema(this, schema, outputPathZodSchema, config, [
          componentRef,
        ]),
      };
      this.addOutput(zodSchemaOutput, config);
    }
  }

  private addOutputByComponentRef(
    componentRef: string,
    config: GenerateConfig
  ) {
    if (isResponseComponentRef(componentRef)) {
      this.addOutputByResponseComponentRef(componentRef, config);
      return;
    }
    if (isParameterComponentRef(componentRef)) {
      this.addOutputByParameterComponentRef(componentRef, config);
    }
    if (isSchemaComponentRef(componentRef)) {
      this.addOutputBySchemaComponentRef(componentRef, config);
    }
    throw new Error(`case for "${componentRef}" is not supported`);
  }

  hasSameFileContext(
    outputPath1: OutputPath,
    outputPath2: OutputPath
  ): boolean {
    const filePath1 = this.createFilePathFromOutputPath(outputPath1);
    const filePath2 = this.createFilePathFromOutputPath(outputPath2);
    return filePath1 === filePath2;
  }

  findComponentSchemaByRef(componentRef: string): null | Schema {
    const components = this.oas3Specs.components;
    if (
      componentRef.startsWith(schemaComponentRefPrefix) &&
      components.schemas
    ) {
      const name = componentRef.replace(schemaComponentRefPrefix, '');
      const schema = components.schemas[name];
      return schema ?? null;
    }
    return null;
  }

  findComponentParameterByRef(componentRef: string): null | Parameter {
    const components = this.oas3Specs.components;
    if (
      componentRef.startsWith(parameterComponentRefPrefix) &&
      components.parameters
    ) {
      const name = componentRef.replace(parameterComponentRefPrefix, '');
      const parameter = components.parameters[name];
      return parameter ?? null;
    }
    return null;
  }

  findComponentResponseByRef(componentRef: string): null | Response {
    const components = this.oas3Specs.components;
    if (
      componentRef.startsWith(responseComponentRefPrefix) &&
      components.responses
    ) {
      const name = componentRef.replace(responseComponentRefPrefix, '');
      const response = components.responses[name];
      return response ?? null;
    }
    return null;
  }

  private generateRequestByMethodMapOutputs(
    path: string,
    requestByMethodMap: RequestByMethodMap,
    config: GenerateConfig
  ) {
    for (const method in requestByMethodMap) {
      const requestSchema = requestByMethodMap[method];
      const endpointId = {path, method};
      applyEndpointCallerFunction(this, endpointId, requestSchema, config);
    }
  }

  private createFolderOutputPathFromOutputPath(
    outputPath: OutputPath
  ): OutputPath {
    if (outputPath.length < 2) {
      return [];
    }
    const folderOutputPath =
      this.findMostAccurateOperationFolderOutputPath(outputPath);
    if (!folderOutputPath) {
      return [];
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
    const prefix = folders.length > 0 ? '/' : '';
    return `${prefix}${folders.join('/')}/${fileName}.ts`;
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

  private getRequiredOutputPathsFromOutput(
    o: Output,
    config: GenerateConfig
  ): OutputPath[] {
    if (o.type === OutputType.DEFINITION) {
      return o.getRequiredOutputPaths();
    }
    if (o.type === OutputType.COMPONENT_REF) {
      return o.getRequiredOutputPaths();
    }
    if (o.type === OutputType.TEMPLATE_DEFINITION) {
      return o.getRequiredOutputPaths(config);
    }
    // @ts-ignore
    throw new Error(`output.type "${o.type}" is not supported`);
  }

  private addImportsToFileOutput(
    fileOutput: FileOutput,
    output: Output,
    config: GenerateConfig
  ): FileOutput {
    const availableOutputs = this.outputs;
    let nextFileOutput = fileOutput;
    this.getRequiredOutputPathsFromOutput(output, config).forEach(
      requiredOutputPath => {
        let requiredOutput = availableOutputs.find(o =>
          areOutputPathsEqual(o.path, requiredOutputPath)
        );
        if (!requiredOutput) {
          return;
        }

        if (
          output.type !== OutputType.COMPONENT_REF &&
          this.isSameOutputFile(requiredOutput.path, output.path)
        ) {
          return;
        }

        if (output.type === OutputType.COMPONENT_REF) {
          const componentOutputPath = this.createOutputPathByComponentRef(
            output.componentRef
          );
          requiredOutput = availableOutputs.find(o =>
            areOutputPathsEqual(o.path, componentOutputPath)
          );
          if (!requiredOutput) {
            return;
          }
          if (this.isSameOutputFile(requiredOutput.path, output.path)) {
            return;
          }
        }

        const importAsset: ImportAsset =
          output.type === OutputType.COMPONENT_REF
            ? {
                name: output.createName(requiredOutput.path),
                importAsName: output.createName(output.path),
              }
            : {
                name: requiredOutput.createName(requiredOutput.path),
                importAsName: requiredOutput.createName(output.path),
              };

        const importPath =
          requiredOutput.fixedImportPath ??
          this.createImportPath(requiredOutput.path, output.path, config);
        const importAssets =
          nextFileOutput.importAssetsByPath[importPath] ?? [];
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
      }
    );
    return nextFileOutput;
  }

  private createFileOutputByFilePath(
    config: GenerateConfig
  ): FileOutputByFilePath {
    const fileOutputByFilePath: FileOutputByFilePath =
      this.createTemplateFileOutputByFilePath(config);
    this.outputs.forEach(output => {
      if (output.isExternalLibrary) {
        return;
      }
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
        case OutputType.TEMPLATE_DEFINITION:
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
    function getMergedUniqueStrings(arr1: string[], arr2: string[]): string[] {
      const mergedArr = [...arr1, ...arr2];
      return mergedArr.filter((value, index, array) => {
        return array.indexOf(value) === index;
      });
    }
    let nextFileOutputByFilePath = fileOutputByFilePath;
    for (const filePath in fileOutputByFilePath) {
      const folderPath = filePath.split('/').slice(0, -1).join('/');
      const indexFilePath = `${folderPath}/index.ts`;
      const fileOutput = this.createFileOutputForIndexTsFile(
        folderPath,
        fileOutputByFilePath
      );
      const existingFileOutput = fileOutputByFilePath[indexFilePath];
      if (!existingFileOutput) {
        nextFileOutputByFilePath = {
          ...nextFileOutputByFilePath,
          [indexFilePath]: fileOutput,
        };
        continue;
      }
      // As of time of writing this:
      // This case only occurs for the already existing "/core/index.ts" filePath, which was defined in
      // the method "createTemplateFileOutputByFilePath" of this class.
      // This already existing fileOutput contains only values in the "exportPaths" property.
      // Therefore, only the "exportPaths" has to be merged as of right now.
      const mergedFileOutput: FileOutput = {
        ...existingFileOutput,
        exportPaths: getMergedUniqueStrings(
          fileOutput.exportPaths,
          existingFileOutput.exportPaths
        ),
      };
      nextFileOutputByFilePath = {
        ...nextFileOutputByFilePath,
        [indexFilePath]: mergedFileOutput,
      };
    }
    return nextFileOutputByFilePath;
  }

  private createFileOutputForIndexTsFile(
    folderPath: string,
    fileOutputByFilePath: FileOutputByFilePath
  ): FileOutput {
    const exportPaths: string[] = [];
    for (const filePath in fileOutputByFilePath) {
      const fileName = filePath.split('/').pop();
      const fileFolderPath = filePath.split('/').slice(0, -1).join('/');
      if (folderPath === fileFolderPath && fileName !== 'index.ts') {
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

  addOutput(
    output: Output,
    config: GenerateConfig,
    preventFromAddingComponentRefs: string[] = []
  ) {
    switch (output.type) {
      case OutputType.COMPONENT_REF:
        this.outputs.push(output);
        if (!preventFromAddingComponentRefs.includes(output.componentRef)) {
          this.addOutputByComponentRef(output.componentRef, config);
        }
        break;
      case OutputType.DEFINITION:
        // eslint-disable-next-line no-case-declarations
        const outputWithSamePath = this.outputs.find(
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
        this.outputs.push(output);
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
    return operationId
      .split('/')
      .join('.')
      .split('.')
      .map(p => lowerCaseFirstLetter(p));
  }

  private isResponseOutputPath(outputPath: OutputPath): boolean {
    if (outputPath[outputPath.length - 2] !== responseOutputPathPart) {
      return false;
    }
    return outputPath.includes(requestResultOutputPathPart);
  }

  private isUnionResponseOutputPath(outputPath: OutputPath): boolean {
    return outputPath[outputPath.length - 1] === responseOutputPathPart;
  }

  private isRequestResultOutputPath(outputPath: OutputPath): boolean {
    return outputPath[outputPath.length - 1] === requestResultOutputPathPart;
  }

  private createResponseStatusCodeName(statusCode: number): string {
    switch (statusCode) {
      case 200:
        return 'Ok';
      case 201:
        return 'Created';
      case 202:
        return 'Accepted';
      case 203:
        return 'NonAuthoritativeInformation';
      case 204:
        return 'NoContent';
      case 400:
        return 'BadRequest';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'NotFound';
      case 405:
        return 'MethodNotAllowed';
      case 413:
        return 'ContentTooLarge';
      case 500:
        return 'InternalServerError';
      default:
        throw new Error(`case for statusCode ${statusCode} is not supported`);
    }
  }

  private createPascalCaseNamedTypeName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string {
    let parts = this.isSameOutputFolder(outputPath, referencingPath)
      ? this.getOutputPathWithoutFolderOutputPathParts(outputPath)
      : outputPath;
    parts = parts.filter(
      p =>
        p !== componentSchemasFileNameOutputPathPart &&
        p !== componentParametersFileNameOutputPathPart &&
        p !== componentResponsesFileNameOutputPathPart &&
        p !== oneOfSchemaItemOutputPathPart
    );
    parts = parts.map(p => {
      if (p === arraySchemaItemOutputPathPart) {
        return 'item';
      }
      if (p === objectSchemaAdditionalPropsOutputPathPart) {
        return 'additionalProps';
      }
      return p;
    });
    if (this.isUnionResponseOutputPath(parts)) {
      parts = parts.filter(
        p => p !== requestResultOutputPathPart && p !== responseOutputPathPart
      );
      parts = [...parts, 'response'];
      return parts.map(p => capitalizeFirstLetter(p)).join('');
    }
    if (this.isResponseOutputPath(parts)) {
      const responseOutputPathPartIndex = parts.findIndex(
        p => p === responseOutputPathPart
      );
      if (responseOutputPathPartIndex === -1) {
        throw new Error(
          'this case should have been caught by the parent if condition'
        );
      }
      const statusCodeIndex = responseOutputPathPartIndex + 1;
      const statusCode = parseInt(parts[statusCodeIndex]);
      const statusCodeOutputPathPart = isNaN(statusCode)
        ? 'any'
        : this.createResponseStatusCodeName(statusCode);
      parts = [
        ...parts.slice(0, statusCodeIndex),
        statusCodeOutputPathPart,
        'response',
      ];
      parts = parts.filter(
        p => p !== requestResultOutputPathPart && p !== responseOutputPathPart
      );
      return parts.map(p => capitalizeFirstLetter(p)).join('');
    }
    if (this.isRequestResultOutputPath(parts)) {
      parts = [...parts.slice(0, -1), 'requestResult'];
      return parts.map(p => capitalizeFirstLetter(p)).join('');
    }
    return parts.map(p => capitalizeFirstLetter(p)).join('');
  }

  createTypeName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const n = this.createPascalCaseNamedTypeName(outputPath, referencingPath);
    return n.match(/^\d/) ? `$${n}` : n;
  }

  createEnumName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const n = this.createPascalCaseNamedTypeName(outputPath, referencingPath);
    return n.match(/^\d/) ? `$${n}` : n;
  }

  createConstName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const n = lowerCaseFirstLetter(
      this.createPascalCaseNamedTypeName(outputPath, referencingPath)
    );
    return n.match(/^\d/) ? `$${n}` : n;
  }

  createFunctionName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string {
    const n = lowerCaseFirstLetter(
      this.createPascalCaseNamedTypeName(outputPath, referencingPath)
    );
    return n.match(/^\d/) ? `$${n}` : n;
  }

  private findMostAccurateOperationFolderOutputPath(
    outputPath: OutputPath
  ): null | OutputPath {
    let mostAccurateFolderOutputPath: null | OutputPath = null;
    this.operationFolderOutputPaths.forEach(folderOutputPath => {
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
      .split('/')
      .join('.')
      .split('.')
      .map(p => lowerCaseFirstLetter(p));
    let folderOutputPathParts: OutputPath = [];
    if (outputPathParts.length >= 2) {
      const mostAccurateOperationFolderOutputPath =
        this.findMostAccurateOperationFolderOutputPath(outputPathParts);
      folderOutputPathParts =
        mostAccurateOperationFolderOutputPath ?? outputPathParts.slice(0, 1);
    }
    const typeNamePathParts = outputPathParts.slice(
      folderOutputPathParts.length
    );
    let fileNameOutputPathPart: string | null = null;
    if (isParameterComponentRef(componentRef)) {
      fileNameOutputPathPart = componentParametersFileNameOutputPathPart;
    } else if (isResponseComponentRef(componentRef)) {
      fileNameOutputPathPart = componentResponsesFileNameOutputPathPart;
      typeNamePathParts.push('responsePayload');
    } else if (isSchemaComponentRef(componentRef)) {
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

  createOutputPathByComponentRefForZodSchema(componentRef: string): OutputPath {
    return [...this.createOutputPathByComponentRef(componentRef), 'zodSchema'];
  }

  createComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath
  ): string {
    const outputPath = this.createOutputPathByComponentRef(componentRef);
    return this.createTypeName(outputPath, referencingPath);
  }

  createComponentZodSchemaName(
    componentRef: string,
    referencingPath: OutputPath
  ): string {
    const outputPath = this.createOutputPathByComponentRef(componentRef);
    return `${this.createConstName(outputPath, referencingPath)}ZodSchema`;
  }
}

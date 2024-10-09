import {
  AnyDefinitionOutput,
  areOutputPathsEqual,
  capitalizeFirstLetter,
  CodeGenerator,
  containsOutputPath,
  Context,
  DefinitionOutput,
  doesOutputPathStartWithOtherOutputPath,
  endpointSchemaOutputPathPart,
  GenerateConfig,
  GenerateConfigTemplateName,
  lowerCaseFirstLetter,
  Output,
  OutputPath,
  OutputType,
  requestOutputPathPart,
  requestResultOutputPathPart,
  responseOutputPathPart,
  TemplateDefinitionOutput,
  zodSchemaOutputPathPart,
} from './core';
import {
  Endpoint,
  findComponentRequestBodyByRef,
  findComponentResponseByRef,
  findComponentSchemaByRef,
  requestBodyComponentRefPrefix,
  RequestByMethodMap,
  responseComponentRefPrefix,
  responseHeaderComponentRefPrefix,
  schemaComponentRefPrefix,
  Specification,
  zSpecification,
} from '@/oas3/specification';
import {applyEndpointCallerFunction} from './endpoint';
import {templateDefinitionOutputs, templateZOfZodLibrary} from './template';
import {applySchema} from './schema';
import {applyZodSchema} from './zodSchema';
import {applyResponse} from './response';
import {applyResponseSchema} from './responseSchema';
import {applyRequestBody} from '@/oas3/codegen/request';
import {applyEndpointSchemaRequestBody} from '@/oas3/codegen/endpointSchema';

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
  fs.mkdirSync(dirPath, {recursive: true}, (err: Error) => {
    if (err) throw err;
  });
  fs.writeFileSync(path, content);
}

async function appendToFile(path: string, content: string) {
  const dirPath = path.split('\\').join('/').split('/').slice(0, -1).join('/');
  fs.mkdirSync(dirPath, {recursive: true}, (err: Error) => {
    if (err) throw err;
  });
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
  definitions: AnyDefinitionOutput[];
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

const componentRequestBodiesFileNameOutputPathPart = 'requestBodies6b3a7814';
const componentResponsesFileNameOutputPathPart = 'responses6b3a7814';
const componentSchemasFileNameOutputPathPart = 'schemas6b3a7814';

export interface Logger {
  log(...data: unknown[]): void;
}

type TemplateFileInfo = {
  fileName: string;
  folderPath: string;
  templateName: GenerateConfigTemplateName;
};

const templateCoreFileInfos: TemplateFileInfo[] = [
  {
    fileName: 'fetchApiRequestHandler.ts',
    folderPath: '/core',
    templateName: 'FetchApiRequestHandler',
  },
  {
    fileName: 'axiosRequestHandler.ts',
    folderPath: '/core',
    templateName: 'AxiosRequestHandler',
  },
  {
    fileName: 'authRequestHandler.ts',
    folderPath: '/core',
    templateName: 'AuthRequestHandler',
  },
  {
    fileName: 'scopedRequestHandler.ts',
    folderPath: '/core',
    templateName: 'ScopedRequestHandler',
  },
  {
    fileName: 'zodValidationRequestHandler.ts',
    folderPath: '/core',
    templateName: 'ZodValidationRequestHandler',
  },
  {
    fileName: 'responseExtractors.ts',
    folderPath: '/core',
    templateName: 'ResponseExtractors',
  },
];

export class DefaultCodeGenerator implements CodeGenerator {
  private readonly oas3Specs: Specification;
  private readonly logger: Logger;
  private outputs: Output[];
  private operationFolderOutputPaths: OutputPath[];

  constructor(oas3Specs: Specification, logger: Logger) {
    zSpecification.parse(oas3Specs);
    this.oas3Specs = oas3Specs;
    this.logger = logger;
    this.outputs = [];
    this.operationFolderOutputPaths = [];
  }

  public getSpecification(): Specification {
    return this.oas3Specs;
  }

  generate(config: GenerateConfig) {
    const ctx: Context = {
      operationType: null,
      response: null,
      config,
      preventFromAddingComponentRefs: [],
    };
    this.reset(ctx);
    for (const path in this.oas3Specs.paths) {
      const requestByMethodMap = this.oas3Specs.paths[path];
      this.generateRequestByMethodMapOutputs(path, requestByMethodMap, ctx);
    }
    const fileOutputByFilePath = this.createFileOutputByFilePath(ctx);
    this.createFiles(fileOutputByFilePath, ctx);
  }

  private reset(ctx: Context) {
    this.outputs = [...templateDefinitionOutputs];
    this.resetOperationFolderOutputPaths(ctx);
  }

  private resetOperationFolderOutputPaths(ctx: Context) {
    this.operationFolderOutputPaths = [
      ['core'],
      ...(ctx.config.predefinedFolderOutputPaths ?? []),
    ];
    for (const path in this.oas3Specs.paths) {
      const requestByMethodMap = this.oas3Specs.paths[path];
      for (const method in requestByMethodMap) {
        const endpointSchema = requestByMethodMap[method];
        if (
          ctx.config.shouldAddOperation &&
          !ctx.config.shouldAddOperation(path, method, endpointSchema)
        ) {
          continue;
        }
        const outputPath = this.createOperationOutputPath(
          path,
          method,
          endpointSchema,
          ctx
        );
        if (outputPath.length < 2) {
          continue;
        }
        const folderOutputPath = outputPath.slice(0, -1);
        this.operationFolderOutputPaths.push(folderOutputPath);
      }
    }
  }

  private getTemplateFileInfosToGenerate(ctx: Context): TemplateFileInfo[] {
    const fileInfos = templateCoreFileInfos.filter(
      fileInfo =>
        ctx.config.withZod ||
        fileInfo.templateName !== 'ZodValidationRequestHandler'
    );
    return fileInfos.filter(
      f =>
        !ctx.config.templates || ctx.config.templates.includes(f.templateName)
    );
  }

  private createTemplateFileOutputByFilePath(
    ctx: Context
  ): FileOutputByFilePath {
    const templateFileInfos = this.getTemplateFileInfosToGenerate(ctx);
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

  private copyTemplateFiles(ctx: Context) {
    const templateFileInfos = this.getTemplateFileInfosToGenerate(ctx);
    templateFileInfos.forEach(fileInfo => {
      fs.cpSync(
        path.resolve(
          __dirname,
          '../../templates',
          cleanUpFolderPath(fileInfo.folderPath),
          fileInfo.fileName
        ),
        path.resolve(
          ctx.config.outputFolderPath,
          cleanUpFolderPath(fileInfo.folderPath),
          fileInfo.fileName
        )
      );
    });
  }

  private createFiles(
    fileOutputByFilePath: FileOutputByFilePath,
    ctx: Context
  ) {
    const cleanTargetFolderPath = cleanUpFolderPath(
      ctx.config.outputFolderPath
    );
    removeDirectoryRecursively(cleanTargetFolderPath);
    this.copyTemplateFiles(ctx);
    for (const filePath in fileOutputByFilePath) {
      const fileOutput = fileOutputByFilePath[filePath];
      const fsFilePath = path.resolve(
        ctx.config.outputFolderPath,
        cleanUpFolderPath(filePath)
      );
      if (fs.existsSync(fsFilePath)) {
        appendToFile(fsFilePath, this.createFileContent(fileOutput, ctx)).then(
          () => {
            this.logger.log(`extended file: ${fsFilePath}`);
          }
        );
        continue;
      }
      writeFile(fsFilePath, this.createFileContent(fileOutput, ctx)).then(
        () => {
          this.logger.log(`created file: ${fsFilePath}`);
        }
      );
    }
  }

  private createDeclarationForGeneratedDefinitionOutput(
    o: DefinitionOutput
  ): string {
    const genericsDeclarationCode = o.createGenericsDeclarationCode
      ? `<${o.createGenericsDeclarationCode()}>`
      : '';
    switch (o.definitionType) {
      case 'function':
        return `export function ${o.createName(o.path)}${o.createCode(o.path)}`;
      case 'const':
        let typeDeclarationCode = '';
        if (o.createNullableExplicitTypeDeclarationCode) {
          typeDeclarationCode =
            o.createNullableExplicitTypeDeclarationCode() ?? '';
        }
        const typeDeclarationCodePart = typeDeclarationCode
          ? `: ${typeDeclarationCode}`
          : '';
        const codeParts: string[] = [];
        if (typeDeclarationCode) {
          codeParts.push(
            '// @ts-ignore - due to ZodSchema recursion it is required to force the type like so'
          );
        }
        codeParts.push(
          `export const ${o.createName(o.path)}${typeDeclarationCodePart} = ${o.createCode(o.path)}`
        );
        return codeParts.join('\n');
      case 'type':
        return `export type ${o.createName(o.path)}${genericsDeclarationCode} = ${o.createCode(o.path)}`;
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
    ctx: Context
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
        )}${genericsDeclarationCode}${o.createCode(ctx, o.path)}`;
      case 'const':
        return `export const ${o.createName(o.path)} = ${o.createCode(
          ctx,
          o.path
        )}`;
      case 'type':
        return `export type ${o.createName(
          o.path
        )}${genericsDeclarationCode} = ${o.createCode(ctx, o.path)}`;
      case 'interface':
        return `export interface ${o.createName(
          o.path
        )}${genericsDeclarationCode} ${o.createCode(ctx, o.path)}`;
      default:
        throw new Error(`output type "${o.definitionType}" is not supported`);
    }
  }

  private createFileContent(fileOutput: FileOutput, ctx: Context): string {
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
            this.createDeclarationForTemplateDefinitionOutput(o, ctx);
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

  private addOutputByResponseComponentRef(componentRef: string, ctx: Context) {
    const response = findComponentResponseByRef(this.oas3Specs, componentRef);
    if (!response) {
      throw new Error(`could not find component "${componentRef}" in specs`);
    }
    const typeOutputPath = this.createResponseComponentTypeOutputPath(
      componentRef,
      ctx
    );
    if (this.findOutputByOutputPath(typeOutputPath)) {
      return;
    }
    const applyResponseCtx: Context = {
      ...ctx,
      response: {
        ...(ctx.response ?? {}),
        genericStatusVariableValue: 'S',
      },
    };
    const typeOutput: DefinitionOutput = {
      type: OutputType.DEFINITION,
      ...applyResponse(this, response, typeOutputPath, applyResponseCtx),
      definitionType: 'type',
      createGenericsDeclarationCode: () => {
        return 'S extends number = any';
      },
      createName: referencingPath =>
        this.createResponseComponentTypeName(
          componentRef,
          referencingPath,
          ctx
        ),
    };
    this.addOutput(typeOutput, ctx);

    const schemaConstOutputPath =
      this.createResponseComponentSchemaConstOutputPath(componentRef, ctx);
    const schemaConstOutput: DefinitionOutput = {
      type: OutputType.DEFINITION,
      ...applyResponseSchema(this, response, schemaConstOutputPath, ctx),
      definitionType: 'const',
      createName: referencingPath =>
        this.createResponseComponentConstName(
          componentRef,
          referencingPath,
          ctx
        ),
    };
    this.addOutput(schemaConstOutput, ctx);
  }

  private addOutputByRequestBodyComponentRef(
    componentRef: string,
    ctx: Context
  ) {
    const requestBody = findComponentRequestBodyByRef(
      this.oas3Specs,
      componentRef
    );
    if (!requestBody) {
      throw new Error(`could not find component "${componentRef}" in specs`);
    }
    const typeOutputPath = this.createRequestBodyComponentTypeOutputPath(
      componentRef,
      ctx
    );
    if (this.findOutputByOutputPath(typeOutputPath)) {
      return;
    }
    const typeOutput: DefinitionOutput = {
      type: OutputType.DEFINITION,
      ...applyRequestBody(this, requestBody, typeOutputPath, ctx),
      definitionType: 'type',
      createName: referencingPath =>
        this.createRequestBodyComponentTypeName(
          componentRef,
          referencingPath,
          ctx
        ),
    };
    this.addOutput(typeOutput, ctx);

    const schemaConstOutputPath =
      this.createRequestBodyComponentSchemaConstOutputPath(componentRef, ctx);
    const schemaConstOutput: DefinitionOutput = {
      type: OutputType.DEFINITION,
      ...applyEndpointSchemaRequestBody(
        this,
        requestBody,
        schemaConstOutputPath,
        ctx
      ),
      definitionType: 'const',
      createName: referencingPath =>
        this.createRequestBodyComponentSchemaConstName(
          componentRef,
          referencingPath,
          ctx
        ),
    };
    this.addOutput(schemaConstOutput, ctx);
  }

  private addOutputBySchemaComponentRef(componentRef: string, ctx: Context) {
    const schema = findComponentSchemaByRef(this.oas3Specs, componentRef);
    if (!schema) {
      throw new Error(`could not find component "${componentRef}" in specs`);
    }
    const typeOutputPath = this.createComponentTypeOutputPath(
      componentRef,
      ctx
    );
    if (this.findOutputByOutputPath(typeOutputPath)) {
      return;
    }
    const schemaTypeOutput: DefinitionOutput = {
      type: OutputType.DEFINITION,
      ...applySchema(this, schema, typeOutputPath, ctx),
      definitionType: 'type',
      createName: referencingPath =>
        this.createSchemaComponentTypeName(componentRef, referencingPath, ctx),
    };
    this.addOutput(schemaTypeOutput, ctx);
    if (ctx.config.withZod) {
      const zodSchemaOutputPath = this.createSchemaComponentZodConstOutputPath(
        componentRef,
        ctx
      );
      const zodSchemaCode = applyZodSchema(
        this,
        schema,
        zodSchemaOutputPath,
        ctx
      );
      const zodSchemaOutput: DefinitionOutput = {
        ...zodSchemaCode,
        type: OutputType.DEFINITION,
        definitionType: 'const',
        createNullableExplicitTypeDeclarationCode: () => {
          if (zodSchemaCode.referencesRecursiveComponents()) {
            return `${templateZOfZodLibrary.createName(
              zodSchemaOutputPath
            )}.ZodType<${schemaTypeOutput.createName(zodSchemaOutputPath)}>`;
          }
          return null;
        },
        createName: referencingPath =>
          this.createSchemaComponentZodConstName(
            componentRef,
            referencingPath,
            ctx
          ),
        getRequiredOutputPaths: () => {
          if (!zodSchemaCode.referencesRecursiveComponents()) {
            return zodSchemaCode.getRequiredOutputPaths();
          }
          const outputPaths: OutputPath[] = [
            ...zodSchemaCode.getRequiredOutputPaths(),
          ];
          if (!containsOutputPath(outputPaths, schemaTypeOutput.path)) {
            outputPaths.push(schemaTypeOutput.path);
          }
          if (!containsOutputPath(outputPaths, templateZOfZodLibrary.path)) {
            outputPaths.push(templateZOfZodLibrary.path);
          }
          return outputPaths;
        },
      };
      this.addOutput(zodSchemaOutput, ctx);
    }
  }

  private addOutputByComponentRef(componentRef: string, ctx: Context) {
    if (componentRef.startsWith(schemaComponentRefPrefix)) {
      this.addOutputBySchemaComponentRef(componentRef, ctx);
      return;
    }
    if (componentRef.startsWith(requestBodyComponentRefPrefix)) {
      this.addOutputByRequestBodyComponentRef(componentRef, ctx);
      return;
    }
    if (componentRef.startsWith(responseComponentRefPrefix)) {
      this.addOutputByResponseComponentRef(componentRef, ctx);
      return;
    }
    throw new Error(`case for "${componentRef}" is not supported`);
  }

  private generateRequestByMethodMapOutputs(
    path: string,
    requestByMethodMap: RequestByMethodMap,
    ctx: Context
  ) {
    for (const method in requestByMethodMap) {
      const endpointSchema = requestByMethodMap[method];
      if (
        ctx.config.shouldAddOperation &&
        !ctx.config.shouldAddOperation(path, method, endpointSchema)
      ) {
        continue;
      }
      applyEndpointCallerFunction(this, path, method, endpointSchema, ctx);
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
    if (fileName === componentRequestBodiesFileNameOutputPathPart) {
      fileName = 'requestBodies';
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
    ctx: Context
  ): string {
    const targetFilePath = this.createFilePathFromOutputPath(localOutputPath);
    const targetFolderPathParts = targetFilePath.split('/').slice(0, -1);
    if (ctx.config.importRootAlias) {
      return `${ctx.config.importRootAlias}${targetFolderPathParts.join('/')}`;
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
    let relativePath = refFolderPath ? '../' : '.';
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
    ctx: Context
  ): OutputPath[] {
    if (o.type === OutputType.DEFINITION) {
      return o.getRequiredOutputPaths();
    }
    if (o.type === OutputType.COMPONENT_REF) {
      return o.getRequiredOutputPaths();
    }
    if (o.type === OutputType.TEMPLATE_DEFINITION) {
      return o.getRequiredOutputPaths(ctx);
    }
    // @ts-ignore
    throw new Error(`output.type "${o.type}" is not supported`);
  }

  private addImportsToFileOutput(
    fileOutput: FileOutput,
    output: Output,
    ctx: Context
  ): FileOutput {
    const availableOutputs = this.outputs;
    let nextFileOutput = fileOutput;
    this.getRequiredOutputPathsFromOutput(output, ctx).forEach(
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
          const componentOutputPath = this.createComponentTypeOutputPath(
            output.componentRef,
            ctx
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
          this.createImportPath(requiredOutput.path, output.path, ctx);
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

  private createFileOutputByFilePath(ctx: Context): FileOutputByFilePath {
    const fileOutputByFilePath: FileOutputByFilePath =
      this.createTemplateFileOutputByFilePath(ctx);
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
      fileOutput = this.addImportsToFileOutput(fileOutput, output, ctx);
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

  addOutput(output: Output, ctx: Context) {
    switch (output.type) {
      case OutputType.COMPONENT_REF:
        this.outputs.push(output);
        if (!ctx.preventFromAddingComponentRefs.includes(output.componentRef)) {
          const addOutputCtx: Context = {
            ...ctx,
            preventFromAddingComponentRefs: [
              ...ctx.preventFromAddingComponentRefs,
              output.componentRef,
            ],
          };
          this.addOutputByComponentRef(output.componentRef, addOutputCtx);
        }
        break;
      case OutputType.DEFINITION:
        // eslint-disable-next-line no-case-declarations
        const outputWithSamePath = this.outputs.find(
          o =>
            o.type !== OutputType.COMPONENT_REF &&
            areOutputPathsEqual(o.path, output.path) &&
            o.definitionType === output.definitionType
        );
        if (outputWithSamePath) {
          throw new Error(
            `ambiguous definitions for outputPath [${output.path.join(
              ', '
            )}] having same definitionType "${output.definitionType}"`
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

  private createDefaultOperationOutputPath(
    path: string,
    method: string,
    endpointSchema: Endpoint,
    ctx: Context
  ): OutputPath {
    if (endpointSchema.operationId) {
      return this.createOutputPathFromString(
        endpointSchema.operationId,
        ctx.config.operationIdOutputPathSeparators
      );
    }
    const parts = path
      .split('-')
      .join('/')
      .split('/')
      .filter(p => !!p.length)
      .map(p => lowerCaseFirstLetter(p));
    const verb = method.toLowerCase();
    const lastPart = `${verb}${capitalizeFirstLetter(parts[parts.length - 1])}`;
    if (parts.length === 1) {
      return [lastPart];
    }
    return [...parts.slice(0, parts.length - 1), lastPart];
  }

  createOperationOutputPath(
    path: string,
    method: string,
    endpointSchema: Endpoint,
    ctx: Context
  ): OutputPath {
    const defaultOutputPath = this.createDefaultOperationOutputPath(
      path,
      method,
      endpointSchema,
      ctx
    );
    if (ctx.config.createOperationOutputPath) {
      return ctx.config.createOperationOutputPath(
        method,
        path,
        endpointSchema,
        defaultOutputPath
      );
    }
    return defaultOutputPath;
  }

  private isEndpointSchemaOutputPath(outputPath: OutputPath): boolean {
    return outputPath[outputPath.length - 1] === endpointSchemaOutputPathPart;
  }

  private isRequestOutputPath(outputPath: OutputPath): boolean {
    return outputPath[outputPath.length - 1] === requestOutputPathPart;
  }

  private isRequestResultOutputPath(outputPath: OutputPath): boolean {
    return outputPath[outputPath.length - 1] === requestResultOutputPathPart;
  }

  private isResponseOutputPath(outputPath: OutputPath): boolean {
    return outputPath[outputPath.length - 1] === responseOutputPathPart;
  }

  private createPascalCaseOutputName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string {
    let parts = this.isSameOutputFolder(outputPath, referencingPath)
      ? this.getOutputPathWithoutFolderOutputPathParts(outputPath)
      : outputPath;
    parts = parts
      .map(p => (p === requestResultOutputPathPart ? 'requestResult' : p))
      .filter(
        p =>
          p !== componentSchemasFileNameOutputPathPart &&
          p !== componentRequestBodiesFileNameOutputPathPart &&
          p !== componentResponsesFileNameOutputPathPart &&
          p !== zodSchemaOutputPathPart
      );
    if (this.isRequestResultOutputPath(outputPath)) {
      parts = [...parts.slice(0, -1), 'requestResult'];
      return parts.map(p => capitalizeFirstLetter(p)).join('');
    } else if (this.isEndpointSchemaOutputPath(outputPath)) {
      parts = [...parts.slice(0, -1), 'endpointSchema'];
      return parts.map(p => capitalizeFirstLetter(p)).join('');
    } else if (this.isRequestOutputPath(outputPath)) {
      parts = [...parts.slice(0, -1), 'request'];
      return parts.map(p => capitalizeFirstLetter(p)).join('');
    } else if (this.isResponseOutputPath(outputPath)) {
      parts = [...parts.slice(0, -2), 'response'];
      return parts.map(p => capitalizeFirstLetter(p)).join('');
    }
    return parts.map(p => capitalizeFirstLetter(p)).join('_');
  }

  createTypeName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const n = this.createPascalCaseOutputName(outputPath, referencingPath);
    return n.match(/^\d/) ? `$${n}` : n;
  }

  createConstName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const n = lowerCaseFirstLetter(
      this.createPascalCaseOutputName(outputPath, referencingPath)
    );
    return n.match(/^\d/) ? `$${n}` : n;
  }

  createFunctionName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string {
    const n = lowerCaseFirstLetter(
      this.createPascalCaseOutputName(outputPath, referencingPath)
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

  createOutputPathFromString(str: string, separators?: string[]): OutputPath {
    function createSeparated(parts: string[], separators: string[]): string[] {
      let nextParts: string[] = [];
      const [currentSeparator, ...nextSeparators] = separators;
      parts.forEach(p => {
        let subParts = p.split(currentSeparator);
        if (nextSeparators.length > 0) {
          subParts = createSeparated(subParts, nextSeparators);
        }
        nextParts = [...nextParts, ...subParts];
      });
      return nextParts;
    }
    const parts = createSeparated([str], separators ?? ['.', '/', '\\']);
    return parts.filter(p => !!p.length).map(p => lowerCaseFirstLetter(p));
  }

  private createComponentTypeOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath {
    const componentRefWithoutPrefix = componentRef
      .replace(requestBodyComponentRefPrefix, '')
      .replace(responseComponentRefPrefix, '')
      .replace(responseHeaderComponentRefPrefix, '')
      .replace(schemaComponentRefPrefix, '');
    const outputPathParts: OutputPath = this.createOutputPathFromString(
      componentRefWithoutPrefix,
      ctx.config.componentOutputPathSeparators
    );
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
    if (componentRef.startsWith(requestBodyComponentRefPrefix)) {
      fileNameOutputPathPart = componentRequestBodiesFileNameOutputPathPart;
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

  createSchemaComponentTypeOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath {
    return this.createComponentTypeOutputPath(componentRef, ctx);
  }

  createRequestBodyComponentTypeOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath {
    const outputPath = this.createComponentTypeOutputPath(componentRef, ctx);
    const lastOutputPathPart = `${outputPath[outputPath.length - 1]}RequestBody`;
    return [...outputPath.slice(0, -1), lastOutputPathPart];
  }

  createResponseComponentTypeOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath {
    const outputPath = this.createComponentTypeOutputPath(componentRef, ctx);
    const lastOutputPathPart = `${outputPath[outputPath.length - 1]}Response`;
    return [...outputPath.slice(0, -1), lastOutputPathPart];
  }

  createSchemaComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string {
    const outputPath = this.createComponentTypeOutputPath(componentRef, ctx);
    return this.createTypeName(outputPath, referencingPath);
  }

  createRequestBodyComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string {
    const outputPath = this.createRequestBodyComponentTypeOutputPath(
      componentRef,
      ctx
    );
    return this.createTypeName(outputPath, referencingPath);
  }

  createResponseComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string {
    const outputPath = this.createResponseComponentTypeOutputPath(
      componentRef,
      ctx
    );
    return this.createTypeName(outputPath, referencingPath);
  }

  private createComponentConstOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath {
    return this.createComponentTypeOutputPath(componentRef, ctx);
  }

  createSchemaComponentZodConstOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath {
    return [
      ...this.createComponentConstOutputPath(componentRef, ctx),
      zodSchemaOutputPathPart,
    ];
  }

  createRequestBodyComponentSchemaConstOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath {
    const outputPath = this.createComponentConstOutputPath(componentRef, ctx);
    const lastOutputPathPart = `${outputPath[outputPath.length - 1]}RequestBodySchema`;
    return [...outputPath.slice(0, -1), lastOutputPathPart];
  }

  createResponseComponentSchemaConstOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath {
    const outputPath = this.createComponentConstOutputPath(componentRef, ctx);
    const lastOutputPathPart = `${outputPath[outputPath.length - 1]}ResponseSchema`;
    return [...outputPath.slice(0, -1), lastOutputPathPart];
  }

  createRequestBodyComponentSchemaConstName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string {
    const outputPath = this.createRequestBodyComponentSchemaConstOutputPath(
      componentRef,
      ctx
    );
    return `${this.createConstName(outputPath, referencingPath)}`;
  }

  createResponseComponentConstName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string {
    const outputPath = this.createResponseComponentSchemaConstOutputPath(
      componentRef,
      ctx
    );
    return `${this.createConstName(outputPath, referencingPath)}`;
  }

  createSchemaComponentZodConstName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string {
    const outputPath = this.createSchemaComponentZodConstOutputPath(
      componentRef,
      ctx
    );
    return `z_${this.createTypeName(outputPath, referencingPath)}`;
  }
}

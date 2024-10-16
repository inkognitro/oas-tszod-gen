import {
  Endpoint,
  Endpoint as Oas3Endpoint,
  RequestBodyContentByContentTypeMap,
  ResponseBodyContentByContentTypeMap,
  Specification,
} from '@/oas3/specification';

export type Context = {
  operationType: null | 'read' | 'write';
  response: null | {
    genericStatusVariableValue: null | string;
  };
  config: GenerateConfig;
  preventFromAddingComponentRefs: string[];
};

export type GenerateConfigTemplateName =
  | 'AuthRequestHandler'
  | 'AxiosRequestHandler'
  | 'FetchApiRequestHandler'
  | 'ScopedRequestHandler'
  | 'ZodValidationRequestHandler'
  | 'ResponseExtractors';

export type GenerateConfig = {
  outputFolderPath: string;
  importRootAlias?: string;
  operationIdOutputPathSeparators?: string[];
  componentOutputPathSeparators?: string[];
  predefinedFolderOutputPaths?: OutputPath[];
  withZod?: boolean;
  templates?: GenerateConfigTemplateName[];
  createOperationOutputPath?: (
    path: string,
    method: string,
    schema: Oas3Endpoint,
    defaultOutputPath: OutputPath
  ) => OutputPath;
  shouldAddOperation?: (
    path: string,
    method: string,
    schema: Oas3Endpoint
  ) => boolean;
  shouldAddRequestBodyContent?: (
    contentType: string,
    bodyByContentTypeMap: RequestBodyContentByContentTypeMap
  ) => boolean;
  shouldAddResponseBodyContent?: (
    contentType: string,
    bodyByContentTypeMap: ResponseBodyContentByContentTypeMap
  ) => boolean;
  findCustomStringPatternByFormat?: (format: string) => null | string;
};

export interface CodeGenerator {
  getSpecification(): Specification;
  createSchemaComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string;
  createRequestBodyComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string;
  createResponseComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string;
  createRequestBodyComponentSchemaConstName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string;
  createResponseComponentConstName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string;
  createSchemaComponentZodConstName(
    componentRef: string,
    referencingPath: OutputPath,
    ctx: Context
  ): string;
  createTypeName(outputPath: OutputPath, referencingPath: OutputPath): string;
  createConstName(outputPath: OutputPath, referencingPath: OutputPath): string;
  createFunctionName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string;
  createOperationOutputPath(
    path: string,
    method: string,
    endpointSchema: Endpoint,
    ctx: Context
  ): OutputPath;
  createSchemaComponentTypeOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath;
  createRequestBodyComponentTypeOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath;
  createResponseComponentTypeOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath;
  createRequestBodyComponentSchemaConstOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath;
  createResponseComponentSchemaConstOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath;
  createSchemaComponentZodConstOutputPath(
    componentRef: string,
    ctx: Context
  ): OutputPath;
  addOutput(output: Output, ctx: Context): void;
}

export enum OutputType {
  DEFINITION = 'DEFINITION',
  TEMPLATE_DEFINITION = 'TEMPLATE_DEFINITION',
  COMPONENT_REF = 'COMPONENT_REF',
}

export const endpointSchemaOutputPathPart = 'endpointSchema6b3a7814';
export const requestOutputPathPart = 'request6b3a7814';
export const responseOutputPathPart = 'response6b3a7814';
export const requestResultOutputPathPart = 'requestResult6b3a7814';
export const zodSchemaOutputPathPart = 'zodSchema6b3a7814';

export type OutputPath = string[];

export function areOutputPathsEqual(a: OutputPath, b: OutputPath): boolean {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
}

export function containsOutputPath(
  outputPaths: OutputPath[],
  outputPath: OutputPath
): boolean {
  return !!outputPaths.find(p => areOutputPathsEqual(p, outputPath));
}

export function doesOutputPathStartWithOtherOutputPath(
  outputPath: OutputPath,
  otherOutputPath: OutputPath
): boolean {
  if (outputPath.length < otherOutputPath.length) {
    return false;
  }
  for (const index in otherOutputPath) {
    if (outputPath[index] !== otherOutputPath[index]) {
      return false;
    }
  }
  return true;
}

export type CreateCodeFunc = (
  referencingPath: OutputPath,
  Context?: Context
) => string;

export type CodeGenerationOutput = {
  path: OutputPath;
  getRequiredOutputPaths: () => OutputPath[];
  createCode: CreateCodeFunc;
  codeComment?: string;
};

type GenericOutput<T extends OutputType, P extends object = {}> = P & {
  type: T;
  path: OutputPath;
  fixedImportPath?: string;
  isExternalLibrary?: boolean;
  createName: (referencingPath: OutputPath) => string;
};

type DefinitionType = 'const' | 'function' | 'type' | 'interface';

export type DefinitionOutput = GenericOutput<
  OutputType.DEFINITION,
  {
    definitionType: DefinitionType;
    createCode: CreateCodeFunc;
    createNullableExplicitTypeDeclarationCode?: () => null | string;
    createGenericsDeclarationCode?: () => string;
    codeComment?: string;
    getRequiredOutputPaths: () => OutputPath[];
  }
>;

export type TemplateDefinitionOutput = GenericOutput<
  OutputType.TEMPLATE_DEFINITION,
  {
    definitionType: 'const' | 'function' | 'type' | 'interface';
    createCode?: (ctx: Context, referencingPath: OutputPath) => string;
    createGenericsDeclarationCode?: () => string;
    codeComment?: string;
    getRequiredOutputPaths: (ctx: Context) => OutputPath[];
  }
>;

export type AnyDefinitionOutput = TemplateDefinitionOutput | DefinitionOutput;

export type ComponentRefOutput = GenericOutput<
  OutputType.COMPONENT_REF,
  {
    componentRef: string;
    getRequiredOutputPaths: () => OutputPath[];
  }
>;

export type Output =
  | DefinitionOutput
  | TemplateDefinitionOutput
  | ComponentRefOutput;

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function lowerCaseFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

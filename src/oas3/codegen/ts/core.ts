export interface CodeGenerator {
  createComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath
  ): string;
  createEnumName(outputPath: OutputPath, referencingPath: OutputPath): string;
  createTypeName(outputPath: OutputPath, referencingPath: OutputPath): string;
  createConstName(outputPath: OutputPath, referencingPath: OutputPath): string;
  createFunctionName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string;
  createOperationIdOutputPath(operationId: string): OutputPath;
  createOutputPathByComponentRef(componentRef: string): OutputPath;
  addIndirectOutput(output: IndirectOutput): void;
}

export enum IndirectOutputType {
  ENUM_DEFINITION = 'ENUM_DEFINITION',
  TYPE_DEFINITION = 'TYPE_DEFINITION',
  CONST_DEFINITION = 'CONST_DEFINITION',
  FUNCTION_DEFINITION = 'FUNCTION_DEFINITION',
  COMPONENT_REF = 'COMPONENT_REF',
}

export const arraySchemaItemOutputPathPart = 'array-schema-item-5acf7fae';
export const oneOfSchemaItemOutputPathPart = 'oneOf-schema-item-5acf7fae';
export const objectSchemaAdditionalPropOutputPathPart =
  'object-schema-additionalProp-5acf7fae';

export type OutputPath = string[];

export function areOutputPathsEqual(a: OutputPath, b: OutputPath): boolean {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
}

export function doesOutPathStartWithOtherOutputPath(
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

export type CreateCodeFunc = (referencingPath: OutputPath) => string;

export type CodeGenerationOutput = {
  path: OutputPath;
  requiredOutputPaths: OutputPath[];
  createCode: CreateCodeFunc;
  codeComment?: string;
};

type GenericIndirectOutput<
  T extends IndirectOutputType,
  P extends object = {},
> = P & {
  type: T;
  path: OutputPath;
  requiredOutputPaths: OutputPath[];
};

export type TypeDefinitionOutput = GenericIndirectOutput<
  IndirectOutputType.TYPE_DEFINITION,
  {
    createTypeName: (referencingPath: OutputPath) => string;
    createCode: CreateCodeFunc;
    codeComment?: string;
  }
>;

export type ConstDefinitionOutput = GenericIndirectOutput<
  IndirectOutputType.CONST_DEFINITION,
  {
    createConstName: (referencingPath: OutputPath) => string;
    createCode: CreateCodeFunc;
    codeComment?: string;
  }
>;

export type FunctionDefinitionOutput = GenericIndirectOutput<
  IndirectOutputType.FUNCTION_DEFINITION,
  {
    createFunctionName: (referencingPath: OutputPath) => string;
    createCode: CreateCodeFunc;
    codeComment?: string;
  }
>;

export type EnumDefinitionOutput = GenericIndirectOutput<
  IndirectOutputType.ENUM_DEFINITION,
  {
    createTypeName: (referencingPath: OutputPath) => string;
    createCode: CreateCodeFunc;
    codeComment?: string;
  }
>;

export type ObjectDiscriminatorConfig = {
  propName: string;
  requiredOutputPaths: OutputPath[];
  createCode: CreateCodeFunc;
  codeComment?: string;
};

export type ComponentRefOutput = GenericIndirectOutput<
  IndirectOutputType.COMPONENT_REF,
  {
    createTypeName: (referencingPath: OutputPath) => string;
    componentRef: string;
    objectDiscriminatorConfig?: ObjectDiscriminatorConfig;
  }
>;

export type IndirectOutput =
  | EnumDefinitionOutput
  | TypeDefinitionOutput
  | ConstDefinitionOutput
  | FunctionDefinitionOutput
  | ComponentRefOutput;

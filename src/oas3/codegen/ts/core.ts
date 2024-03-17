export interface CodeGenerator {
  createComponentTypeName(ref: string, referencingPath: OutputPath): string;
  createEnumName(path: OutputPath, referencingPath: OutputPath): string;
  createTypeName(path: OutputPath, referencingPath: OutputPath): string;
  createConstName(path: OutputPath, referencingPath: OutputPath): string;
  createFunctionName(path: OutputPath, referencingPath: OutputPath): string;

  createOutputPathByOperationId(operationId: string): OutputPath;
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

export function mergeIndirectOutputs(
  existingOutputs: IndirectOutput[],
  additionalOutputs: IndirectOutput[]
): IndirectOutput[] {
  let nextOutputs = [...existingOutputs];
  additionalOutputs.forEach(outputToAdd => {
    switch (outputToAdd.type) {
      case IndirectOutputType.COMPONENT_REF:
        // eslint-disable-next-line no-case-declarations
        const foundComponentRefOutput = nextOutputs.find(
          o =>
            o.type === IndirectOutputType.COMPONENT_REF &&
            o.componentRef === outputToAdd.componentRef
        ) as undefined | ComponentRefOutput;
        if (foundComponentRefOutput && outputToAdd.objectDiscriminatorConfig) {
          if (!outputToAdd.objectDiscriminatorConfig) {
            return;
          }
          if (!foundComponentRefOutput.objectDiscriminatorConfig) {
            nextOutputs = nextOutputs.filter(
              o =>
                o.type !== IndirectOutputType.COMPONENT_REF ||
                o.componentRef !== outputToAdd.componentRef
            );
            nextOutputs.push(outputToAdd);
          }
          if (
            JSON.stringify(
              foundComponentRefOutput.objectDiscriminatorConfig
            ) !== JSON.stringify(outputToAdd.objectDiscriminatorConfig)
          ) {
            throw new Error(
              `conflicting "objectDiscriminatorConfig" property for type ComponentRefOutput with componentName "${outputToAdd.componentRef}":` +
                `${JSON.stringify(
                  foundComponentRefOutput.objectDiscriminatorConfig
                )} Vs. ${JSON.stringify(outputToAdd.objectDiscriminatorConfig)}`
            );
          }
          return;
        }
        nextOutputs.push(outputToAdd);
        return;
      case IndirectOutputType.FUNCTION_DEFINITION:
      case IndirectOutputType.ENUM_DEFINITION:
      case IndirectOutputType.TYPE_DEFINITION:
        if (
          nextOutputs.find(o => areOutputPathsEqual(o.path, outputToAdd.path))
        ) {
          throw new Error(
            `ambiguous path definition: ${JSON.stringify(outputToAdd.path)}"`
          );
        }
        nextOutputs.push(outputToAdd);
        return;
      default:
        // @ts-ignore
        throw new Error(`output type "${outputToAdd.type}" is not supported`);
    }
  });
  return nextOutputs;
}

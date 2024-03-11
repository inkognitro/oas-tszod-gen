export type CreateCodeFunc = (referencingContext: string) => string;

export enum OutputType {
  DIRECT = 'DIRECT',
  ENUM_DEFINITION = 'ENUM_DEFINITION',
  COMPONENT_REF = 'COMPONENT_REF',
}

type GenericOutput<T extends OutputType, P extends object = {}> = P & {
  type: T;
  id: string;
  context: string;
  contextOutputId?: string;
};

export type DirectOutput = GenericOutput<
  OutputType.DIRECT,
  {
    createCode: CreateCodeFunc;
    codeComment?: string;
  }
>;

export type EnumDefinitionOutput = GenericOutput<
  OutputType.ENUM_DEFINITION,
  {
    createTypeName: (referencingContext?: string) => string;
    createCode: CreateCodeFunc;
    codeComment?: string;
  }
>;

export type ObjectDiscriminatorConfig = {
  propName: string;
  createCode: CreateCodeFunc;
  codeComment?: string;
  requiredOutputId: string; // todo: remove and define "requiredOutputIds" property for "DirectOutput" type (reverse dependency pointer)
};

export type ComponentRefOutput = GenericOutput<
  OutputType.COMPONENT_REF,
  {
    componentRef: string;
    objectDiscriminatorConfig?: ObjectDiscriminatorConfig;
  }
>;

export type IndirectOutput = EnumDefinitionOutput | ComponentRefOutput;

export type CodeGenerationSummary = {
  directOutput: DirectOutput;
  indirectOutputs: IndirectOutput[];
};

export function mergeIndirectOutputs(
  existingOutputs: IndirectOutput[],
  additionalOutputs: IndirectOutput[]
): IndirectOutput[] {
  let nextOutputs = [...existingOutputs];
  additionalOutputs.forEach(outputToAdd => {
    switch (outputToAdd.type) {
      case OutputType.COMPONENT_REF:
        // eslint-disable-next-line no-case-declarations
        const foundComponentRefOutput = nextOutputs.find(
          o =>
            o.type === OutputType.COMPONENT_REF &&
            o.componentRef === outputToAdd.componentRef
        ) as undefined | ComponentRefOutput;
        if (foundComponentRefOutput && outputToAdd.objectDiscriminatorConfig) {
          if (!outputToAdd.objectDiscriminatorConfig) {
            return;
          }
          if (!foundComponentRefOutput.objectDiscriminatorConfig) {
            nextOutputs = nextOutputs.filter(
              o =>
                o.type !== OutputType.COMPONENT_REF ||
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
      case OutputType.ENUM_DEFINITION:
        if (
          nextOutputs.find(
            o =>
              o.type === OutputType.ENUM_DEFINITION &&
              o.localTypeName === outputToAdd.localTypeName &&
              o.context === outputToAdd.context
          )
        ) {
          throw new Error(
            `ambiguous typeName "${outputToAdd.localTypeName}" for type definition`
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

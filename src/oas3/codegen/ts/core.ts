export enum OutputType {
  DIRECT = 'DIRECT',
  ENUM_DEFINITION = 'ENUM_DEFINITION',
  COMPONENT_REF = 'COMPONENT_REF',
}

export const arrayItemPathPart = 'array-item-5acf7fae';
export const oneOfItemPathPart = 'oneOf-item-5acf7fae';

export type OutputPath = string[];

export function areOutputPathsEqual(a: OutputPath, b: OutputPath): boolean {
  return (
    a.length === b.length && a.every((element, index) => element === b[index])
  );
}

export type CreateCodeFunc = (referencingPath: OutputPath) => string;

type GenericOutput<T extends OutputType, P extends object = {}> = P & {
  type: T;
  id: string;
  path: OutputPath;
  requiredOutputPaths: OutputPath[];
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

export type ComponentRefOutput = GenericOutput<
  OutputType.COMPONENT_REF,
  {
    createTypeName: (referencingPath: OutputPath) => string;
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
              areOutputPathsEqual(o.path, outputToAdd.path)
          )
        ) {
          throw new Error(
            `ambiguous outputPath "${JSON.stringify(
              outputToAdd.path
            )}" for enum definition`
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

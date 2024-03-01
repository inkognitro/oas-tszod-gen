export type DirectOutput = {
  code: string;
  codeComment?: string;
};

export enum IndirectOutputType {
  TYPE_DEFINITION = 'TYPE_DEFINITION',
  COMPONENT_REF = 'COMPONENT_REF',
}

export type TypeDefinitionOutput = {
  type: IndirectOutputType.TYPE_DEFINITION;
  typeName: string;
  code: string;
  codeComment?: string;
};

export type ObjectDiscriminatorConfig = {
  propName: string;
  propValueCode: string;
};

export type ComponentRefOutput = {
  type: IndirectOutputType.COMPONENT_REF;
  componentName: string;
  typeName: string;
  objectDiscriminatorConfig?: ObjectDiscriminatorConfig;
};

export type IndirectOutput = TypeDefinitionOutput | ComponentRefOutput;

export type CodeGenerationSummary = {
  directOutput: DirectOutput;
  indirectOutputs: IndirectOutput[];
};

export function mergeIndirectOutputs(
  existingOutputs: IndirectOutput[],
  additionalOutputs: IndirectOutput[]
): IndirectOutput[] {
  const nextOutputs = [...existingOutputs];
  additionalOutputs.forEach(outputToAdd => {
    switch (outputToAdd.type) {
      case IndirectOutputType.COMPONENT_REF:
        if (
          nextOutputs.find(
            o =>
              o.type === IndirectOutputType.COMPONENT_REF &&
              o.componentName === outputToAdd.componentName
          )
        ) {
          // todo: replace with "outputToAdd" in case of "objectDiscriminatorConfig" is set and does not exist in current output object
          // todo: throw new Error in case of different and defined "objectDiscriminatorConfig" on both objects
          return;
        }
        // eslint-disable-next-line no-case-declarations
        const conflictingOutput = nextOutputs.find(
          o => o.typeName === outputToAdd.typeName
        );
        if (conflictingOutput) {
          if (conflictingOutput.type === IndirectOutputType.COMPONENT_REF) {
            throw new Error(
              `conflicting typeName "${outputToAdd.typeName}" for components with name "${outputToAdd.componentName}" and "${conflictingOutput.componentName}"`
            );
          }
          if (conflictingOutput.type === IndirectOutputType.TYPE_DEFINITION) {
            throw new Error(
              `conflicting typeName "${outputToAdd.typeName}" for component with name "${outputToAdd.componentName}"`
            );
          }
          throw new Error(`conflicting typeName "${outputToAdd.typeName}"`);
        }
        nextOutputs.push(outputToAdd);
        return;
      case IndirectOutputType.TYPE_DEFINITION:
        if (
          nextOutputs.find(
            o =>
              o.type === IndirectOutputType.TYPE_DEFINITION &&
              o.typeName === outputToAdd.typeName
          )
        ) {
          throw new Error(
            `ambiguous typeName "${outputToAdd.typeName}" for type definition`
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

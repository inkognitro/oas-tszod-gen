type OutputBase = {
  id: string;
  contextOutputId?: string;
};

export type DirectOutput = OutputBase & {
  code: string;
  codeComment?: string;
};

export enum IndirectOutputType {
  TYPE_DEFINITION = 'TYPE_DEFINITION',
  COMPONENT_REF = 'COMPONENT_REF',
}

export type TypeDefinitionOutput = OutputBase & {
  type: IndirectOutputType.TYPE_DEFINITION;
  typeName: string;
  codeType: 'enum' | 'type';
  code: string;
  codeComment?: string;
};

export type ObjectDiscriminatorConfig = {
  propName: string;
  propValueCode: string;
};

export type ComponentRefOutput = OutputBase & {
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
  let nextOutputs = [...existingOutputs];
  additionalOutputs.forEach(outputToAdd => {
    switch (outputToAdd.type) {
      case IndirectOutputType.COMPONENT_REF:
        // eslint-disable-next-line no-case-declarations
        const foundComponentRefOutput = nextOutputs.find(
          o =>
            o.type === IndirectOutputType.COMPONENT_REF &&
            o.componentName === outputToAdd.componentName
        ) as undefined | ComponentRefOutput;
        if (foundComponentRefOutput && outputToAdd.objectDiscriminatorConfig) {
          if (!outputToAdd.objectDiscriminatorConfig) {
            return;
          }
          if (!foundComponentRefOutput.objectDiscriminatorConfig) {
            nextOutputs = nextOutputs.filter(
              o =>
                o.type !== IndirectOutputType.COMPONENT_REF ||
                o.componentName !== outputToAdd.componentName
            );
            nextOutputs.push(outputToAdd);
          }
          if (
            JSON.stringify(
              foundComponentRefOutput.objectDiscriminatorConfig
            ) !== JSON.stringify(outputToAdd.objectDiscriminatorConfig)
          ) {
            throw new Error(
              `conflicting "objectDiscriminatorConfig" property for type ComponentRefOutput with componentName "${outputToAdd.componentName}":` +
                `${JSON.stringify(
                  foundComponentRefOutput.objectDiscriminatorConfig
                )} Vs. ${JSON.stringify(outputToAdd.objectDiscriminatorConfig)}`
            );
          }
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
              `conflicting typeName "${outputToAdd.typeName}" for component with name "${outputToAdd.componentName}": multiple types with same typeName name defined`
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

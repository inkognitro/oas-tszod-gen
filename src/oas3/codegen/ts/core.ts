import {
  ConcreteParameter,
  isParameterComponentRef,
  Parameter,
  Response,
  Schema,
} from '@oas3/specification';

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
  createOperationOutputPath(operationId: string): OutputPath;
  createOutputPathByComponentRef(componentRef: string): OutputPath;
  addOutput(
    output: Output,
    preventFromAddingTypesForComponentRefs?: string[]
  ): void;
  findComponentSchemaByRef(componentRef: string): null | Schema;
  findComponentParameterByRef(componentRef: string): null | Parameter;
  hasSameFileContext(outputPath1: OutputPath, outputPath2: OutputPath): boolean;
}

export enum OutputType {
  DEFINITION = 'DEFINITION',
  COMPONENT_REF = 'COMPONENT_REF',
}

export const arraySchemaItemOutputPathPart = 'array-schema-item-5acf7fae';
export const oneOfSchemaItemOutputPathPart = 'oneOf-schema-item-5acf7fae';
export const objectSchemaAdditionalPropsOutputPathPart =
  'object-schema-additionalProps-5acf7fae';

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

export type CreateCodeFunc = (referencingPath: OutputPath) => string;

export type CodeGenerationOutput = {
  path: OutputPath;
  requiredOutputPaths: OutputPath[];
  createCode: CreateCodeFunc;
  codeComment?: string;
};

type GenericOutput<T extends OutputType, P extends object = {}> = P & {
  type: T;
  path: OutputPath;
  createName: (referencingPath: OutputPath) => string;
  requiredOutputPaths: OutputPath[];
};

export type DefinitionOutput = GenericOutput<
  OutputType.DEFINITION,
  {
    definitionType: 'enum' | 'const' | 'function' | 'type';
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
    componentRef: string;
    objectDiscriminatorConfig?: ObjectDiscriminatorConfig;
  }
>;

export type Output = DefinitionOutput | ComponentRefOutput;

export function getConcreteParameter(
  parameterOrComponentRef: Parameter,
  codeGenerator: CodeGenerator
): ConcreteParameter {
  if (!isParameterComponentRef(parameterOrComponentRef)) {
    return parameterOrComponentRef;
  }
  const componentParameter = codeGenerator.findComponentParameterByRef(
    parameterOrComponentRef.$ref
  );
  if (!componentParameter) {
    throw new Error(
      `could not find schema for component with ref "${parameterOrComponentRef.$ref}"`
    );
  }
  if (isParameterComponentRef(componentParameter)) {
    return getConcreteParameter(componentParameter, codeGenerator);
  }
  return componentParameter;
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function lowerCaseFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

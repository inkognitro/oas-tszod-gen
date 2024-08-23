import {
  ConcreteParameter,
  isParameterComponentRef,
  Parameter,
  Schema,
} from '@oas3/specification';
import {GenerateConfig} from '@oas3/codegen/ts/generator';

export type AddOutputConfig = {
  preventFromAddingComponentRefs: string[];
  createWithZodSchema: boolean;
};

export interface CodeGenerator {
  createComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath
  ): string;
  createComponentZodSchemaName(
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
  createZodSchemaOutputPathByComponentRef(componentRef: string): OutputPath;
  addOutput(output: Output, config?: AddOutputConfig): void;
  findComponentSchemaByRef(componentRef: string): null | Schema;
  findComponentParameterByRef(componentRef: string): null | Parameter;
  hasSameFileContext(outputPath1: OutputPath, outputPath2: OutputPath): boolean;
}

export enum OutputType {
  DEFINITION = 'DEFINITION',
  TEMPLATE_DEFINITION = 'TEMPLATE_DEFINITION',
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

export type CreateCodeFunc = (
  referencingPath: OutputPath,
  generateConfig?: GenerateConfig
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
  createName: (referencingPath: OutputPath) => string;
};

type DefinitionType = 'const' | 'function' | 'type' | 'interface';

export type GeneratedDefinitionOutput = GenericOutput<
  OutputType.DEFINITION,
  {
    definitionType: DefinitionType;
    createCode: CreateCodeFunc;
    codeComment?: string;
    getRequiredOutputPaths: () => OutputPath[];
  }
>;

export type TemplateDefinitionOutput = GenericOutput<
  OutputType.TEMPLATE_DEFINITION,
  {
    definitionType: 'const' | 'function' | 'type' | 'interface';
    createCode?: (
      config: GenerateConfig,
      referencingPath: OutputPath
    ) => string;
    createGenericsDeclarationCode?: () => string;
    codeComment?: string;
    getRequiredOutputPaths: (config: GenerateConfig) => OutputPath[];
  }
>;

export type DefinitionOutput =
  | TemplateDefinitionOutput
  | GeneratedDefinitionOutput;

export type ComponentRefOutput = GenericOutput<
  OutputType.COMPONENT_REF,
  {
    componentRef: string;
    getRequiredOutputPaths: () => OutputPath[];
  }
>;

export type Output =
  | GeneratedDefinitionOutput
  | TemplateDefinitionOutput
  | ComponentRefOutput;

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

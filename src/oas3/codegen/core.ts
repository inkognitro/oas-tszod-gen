import {Specification} from '@/oas3/specification';
import {Context} from './generator';

export interface CodeGenerator {
  getSpecification(): Specification;
  createComponentNameForType(
    componentRef: string,
    referencingPath: OutputPath
  ): string;
  createComponentNameForConst(
    componentRef: string,
    referencingPath: OutputPath
  ): string;
  createComponentConstNameForZodSchema(
    componentRef: string,
    referencingPath: OutputPath
  ): string;
  generateEndpointOperationId(method: string, path: string): string;
  createEnumName(outputPath: OutputPath, referencingPath: OutputPath): string;
  createTypeName(outputPath: OutputPath, referencingPath: OutputPath): string;
  createConstName(outputPath: OutputPath, referencingPath: OutputPath): string;
  createFunctionName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string;
  createOperationOutputPath(operationId: string): OutputPath;
  createOutputPathByComponentRefForType(componentRef: string): OutputPath;
  createOutputPathByComponentRefForConst(componentRef: string): OutputPath;
  createOutputPathByComponentRefForZodSchemaConst(
    componentRef: string
  ): OutputPath;
  addOutput(
    output: Output,
    ctx: Context,
    preventFromAddingComponentRefs?: string[]
  ): void;
  addOutputPathWithZodSchemaRecursion(outputPath: OutputPath): void;
}

export enum OutputType {
  DEFINITION = 'DEFINITION',
  TEMPLATE_DEFINITION = 'TEMPLATE_DEFINITION',
  COMPONENT_REF = 'COMPONENT_REF',
}

export const arraySchemaItemOutputPathPart = 'array-schema-item-5acf7fae';
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

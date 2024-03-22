import {
  areOutputPathsEqual,
  CodeGenerator,
  doesOutPathStartWithOtherOutputPath,
  IndirectOutput,
  OutputPath,
} from './core';
import {isSpecification} from '@oas3/specification';

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function lowerCaseFirstLetter(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export type FilesCodeGeneratorConfig = {
  outputPath: string;
};

export class FilesCodeGenerator implements CodeGenerator {
  private readonly indirectOutputs: IndirectOutput[];
  private readonly operationIdPathParts: OutputPath[]; // todo: check if these are required

  constructor() {
    this.indirectOutputs = [];
    this.operationIdPathParts = [];
  }

  generate(oas3Specs: object, config: FilesCodeGeneratorConfig) {
    if (!isSpecification(oas3Specs)) {
      throw new Error('invalid oas3 specification given');
    }
    throw new Error('implement me!');
  }

  addIndirectOutput(output: IndirectOutput) {
    this.indirectOutputs.push(output); // todo: add checks from core.ts
  }

  private getOutputPathWithoutOperationIdPathPart(
    outputPath: OutputPath
  ): OutputPath {
    for (const index in this.operationIdPathParts) {
      const operationIdPathPart = this.operationIdPathParts[index];
      if (
        doesOutPathStartWithOtherOutputPath(outputPath, operationIdPathPart)
      ) {
        return outputPath.slice(operationIdPathPart.length - 1);
      }
    }
    return outputPath;
  }

  private findOperationIdOutputPathFromOutputPath(
    outputPath: OutputPath
  ): null | OutputPath {
    for (const index in this.operationIdPathParts) {
      const operationIdPathPart = this.operationIdPathParts[index];
      if (
        doesOutPathStartWithOtherOutputPath(outputPath, operationIdPathPart)
      ) {
        return operationIdPathPart;
      }
    }
    return null;
  }

  private isSameFileContext(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ) {
    return areOutputPathsEqual(
      outputPath.slice(0, 2),
      referencingPath.slice(0, 2)
    );
  }

  private getOutputPathWithoutDomainPathPart(
    outputPath: OutputPath
  ): OutputPath {
    return outputPath.slice(1);
  }

  createOperationIdOutputPath(operationId: string): OutputPath {
    const path = operationId.split('.').map(p => lowerCaseFirstLetter(p));
    this.operationIdPathParts.push(path);
    return path;
  }

  createTypeName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = this.isSameFileContext(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return pascalCaseParts.join('');
  }

  createEnumName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = this.isSameFileContext(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return pascalCaseParts.join('');
  }

  createConstName(outputPath: OutputPath, referencingPath: OutputPath): string {
    const parts = this.isSameFileContext(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return lowerCaseFirstLetter(pascalCaseParts.join(''));
  }

  createFunctionName(
    outputPath: OutputPath,
    referencingPath: OutputPath
  ): string {
    const parts = this.isSameFileContext(outputPath, referencingPath)
      ? this.getOutputPathWithoutDomainPathPart(outputPath)
      : outputPath;
    const pascalCaseParts = parts.map(p => capitalizeFirstLetter(p));
    return lowerCaseFirstLetter(pascalCaseParts.join(''));
  }

  createOutputPathByComponentRef(componentRef: string): OutputPath {
    const pathStr = componentRef.replace('#/', '').split('/').join('.');
    return pathStr.split('.').map(p => lowerCaseFirstLetter(p));
  }

  createComponentTypeName(
    componentRef: string,
    referencingPath: OutputPath
  ): string {
    const outputPath = this.createOutputPathByComponentRef(componentRef);
    return this.createTypeName(outputPath, referencingPath);
  }
}

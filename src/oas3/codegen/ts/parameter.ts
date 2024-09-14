import {
  ConcreteParameter,
  isParameterComponentRef,
  Parameter,
} from '@oas3/specification';
import {CodeGenerator} from './core';

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

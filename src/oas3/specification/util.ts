import {
  isParameterComponentRef,
  isResponseComponentRef,
  isSchemaComponentRef,
  parameterComponentRefPrefix,
  responseComponentRefPrefix,
  schemaComponentRefPrefix,
} from './componentRef';
import {ConcreteSchema, isConcreteSchema, Schema} from './schema';
import {ConcreteParameter, isConcreteParameter, Parameter} from './endpoint';
import {ConcreteResponse, isConcreteResponse, Response} from './response';
import {Specification} from './specification';

export function findComponentSchemaByRef(
  spec: Specification,
  componentRef: string
): null | Schema {
  const components = spec.components;
  if (componentRef.startsWith(schemaComponentRefPrefix) && components.schemas) {
    const name = componentRef.replace(schemaComponentRefPrefix, '');
    const schema = components.schemas[name];
    return schema ?? null;
  }
  return null;
}

export function findConcreteSchema(
  spec: Specification,
  schema: Schema
): null | ConcreteSchema {
  if (isConcreteSchema(schema)) {
    return schema;
  }
  if (!isSchemaComponentRef(schema)) {
    return null;
  }
  const componentSchema = findComponentSchemaByRef(spec, schema.$ref);
  if (!componentSchema) {
    return null;
  }
  return findConcreteSchema(spec, componentSchema);
}

export function findComponentParameterByRef(
  spec: Specification,
  componentRef: string
): null | Parameter {
  const components = spec.components;
  if (
    componentRef.startsWith(parameterComponentRefPrefix) &&
    components.parameters
  ) {
    const name = componentRef.replace(parameterComponentRefPrefix, '');
    const parameter = components.parameters[name];
    return parameter ?? null;
  }
  return null;
}

export function findConcreteParameter(
  spec: Specification,
  parameter: Parameter
): null | ConcreteParameter {
  if (isConcreteParameter(parameter)) {
    return parameter;
  }
  if (!isParameterComponentRef(parameter)) {
    return null;
  }
  const componentParameter = findComponentParameterByRef(spec, parameter.$ref);
  if (!componentParameter) {
    return null;
  }
  return findConcreteParameter(spec, componentParameter);
}

export function findComponentResponseByRef(
  spec: Specification,
  componentRef: string
): null | Response {
  const components = spec.components;
  if (
    componentRef.startsWith(responseComponentRefPrefix) &&
    components.responses
  ) {
    const name = componentRef.replace(responseComponentRefPrefix, '');
    const response = components.responses[name];
    return response ?? null;
  }
  return null;
}

export function findConcreteResponse(
  spec: Specification,
  response: Response
): null | ConcreteResponse {
  if (isConcreteResponse(response)) {
    return response;
  }
  if (!isResponseComponentRef(response)) {
    return null;
  }
  const componentResponse = findComponentResponseByRef(spec, response.$ref);
  if (!componentResponse) {
    return null;
  }
  return findConcreteResponse(spec, componentResponse);
}

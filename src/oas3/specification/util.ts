import {
  isParameterComponentRef,
  isResponseHeaderComponentRef,
  isSchemaComponentRef,
  parameterComponentRefPrefix,
  requestBodyComponentRefPrefix,
  responseComponentRefPrefix,
  responseHeaderComponentRefPrefix,
  schemaComponentRefPrefix,
} from './componentRef';
import {ConcreteSchema, isConcreteSchema, Schema} from './schema';
import {
  ConcreteParameter,
  isConcreteParameter,
  Parameter,
  RequestBody,
} from './endpoint';
import {
  ConcreteResponseHeader,
  isConcreteResponseHeader,
  Response,
  ResponseHeader,
} from './response';
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
  // todo: check if this is wrong
  //@ts-ignore
  const componentSchema = findComponentSchemaByRef(spec, schema.$ref);
  if (!componentSchema) {
    return null;
  }
  return findConcreteSchema(spec, componentSchema);
}

export function findComponentRequestBodyByRef(
  spec: Specification,
  componentRef: string
): null | RequestBody {
  const components = spec.components;
  if (
    componentRef.startsWith(requestBodyComponentRefPrefix) &&
    components.requestBodies
  ) {
    const name = componentRef.replace(requestBodyComponentRefPrefix, '');
    const requestBody = components.requestBodies[name];
    return requestBody ?? null;
  }
  return null;
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

export function findComponentResponseHeaderByRef(
  spec: Specification,
  componentRef: string
): null | ResponseHeader {
  const components = spec.components;
  if (
    componentRef.startsWith(responseHeaderComponentRefPrefix) &&
    components.headers
  ) {
    const name = componentRef.replace(responseHeaderComponentRefPrefix, '');
    const responseHeader = components.headers[name];
    return responseHeader ?? null;
  }
  return null;
}

export function findConcreteResponseHeader(
  spec: Specification,
  responseHeader: ResponseHeader
): null | ConcreteResponseHeader {
  if (isConcreteResponseHeader(responseHeader)) {
    return responseHeader;
  }
  if (!isResponseHeaderComponentRef(responseHeader)) {
    return null;
  }
  const componentResponseHeader = findComponentResponseHeaderByRef(
    spec,
    responseHeader.$ref
  );
  if (!componentResponseHeader) {
    return null;
  }
  return findConcreteResponseHeader(spec, componentResponseHeader);
}

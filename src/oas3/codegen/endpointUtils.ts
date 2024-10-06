import {CodeGenerator} from './core';
import {
  ConcreteParameterLocation,
  findConcreteParameter,
  findConcreteResponseHeader,
  ObjectSchema,
  ObjectSchemaProps,
  Parameter,
  ResponseHeaderByNameMap,
} from '@/oas3/specification';

// todo: rename to createResponseHeadersObjectSchema
export function createHeadersObjectSchema(
  codeGenerator: CodeGenerator,
  responseHeaderByName: ResponseHeaderByNameMap
): ObjectSchema {
  const requiredProps: string[] = [];
  const props: ObjectSchemaProps = {};
  for (const headerName in responseHeaderByName) {
    const responseHeader = responseHeaderByName[headerName];
    const concreteResponseHeader = findConcreteResponseHeader(
      codeGenerator.getSpecification(),
      responseHeader
    );
    if (!concreteResponseHeader) {
      throw new Error(
        `could not find concrete response header from: ${JSON.stringify(responseHeader)}`
      );
    }
    if (concreteResponseHeader.required) {
      requiredProps.push(headerName);
    }
    props[headerName] = concreteResponseHeader.schema;
  }
  return {
    type: 'object',
    properties: props,
    required: requiredProps,
  };
}

export function findObjectSchemaFromLocationParameters(
  codeGenerator: CodeGenerator,
  requestParameters: Parameter[],
  paramLocation: ConcreteParameterLocation
): null | ObjectSchema {
  const objectSchemaProps: ObjectSchemaProps = {};
  const requiredObjectSchemaPropNames: string[] = [];
  let hasParametersForLocation = false;
  requestParameters.forEach(paramOrRef => {
    const p = findConcreteParameter(
      codeGenerator.getSpecification(),
      paramOrRef
    );
    if (!p) {
      throw new Error(
        `could not find concreteParameter for parameter: ${JSON.stringify(
          paramOrRef
        )}`
      );
    }
    if (p.in !== paramLocation) {
      return;
    }
    hasParametersForLocation = true;
    objectSchemaProps[p.name] = p.schema;
    if (p.required) {
      requiredObjectSchemaPropNames.push(p.name);
    }
  }, []);
  if (!hasParametersForLocation) {
    return null;
  }
  return {
    type: 'object',
    required: requiredObjectSchemaPropNames,
    properties: objectSchemaProps,
  };
}

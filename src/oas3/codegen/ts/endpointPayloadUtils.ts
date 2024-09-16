import {CodeGenerator} from './core';
import {
  ConcreteParameterLocation,
  findConcreteParameter,
  ObjectSchema,
  ObjectSchemaProperties,
  Parameter,
} from '@oas3/specification';

export function findObjectSchemaFromLocationParameters(
  codeGenerator: CodeGenerator,
  requestParameters: Parameter[],
  paramLocation: ConcreteParameterLocation
): null | ObjectSchema {
  const objectSchemaProps: ObjectSchemaProperties = {};
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

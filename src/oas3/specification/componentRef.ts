export type ComponentRef = {
  $ref: 'string';
};

export function isComponentRef(anyValue: any): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (typeof value !== 'object') {
    return false;
  }
  if (typeof value.$ref !== 'string') {
    return false;
  }
  return true;
}

export const schemaComponentRefPrefix = '#/components/schemas/';

export function isSchemaComponentRef(anyValue: any): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith(schemaComponentRefPrefix);
}

export const responseComponentRefPrefix = '#/components/responses/';

export function isResponseComponentRef(
  anyValue: any
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith(responseComponentRefPrefix);
}

export const parameterComponentRefPrefix = '#/components/parameters/';

export function isParameterComponentRef(
  anyValue: any
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith(parameterComponentRefPrefix);
}

export const securitySchemeComponentRefPrefix = '#/components/securitySchemes/';

export function isSecuritySchemesComponentRef(
  anyValue: any
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith(securitySchemeComponentRefPrefix);
}

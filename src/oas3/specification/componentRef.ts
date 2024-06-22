export type ComponentRef = {
  $ref: 'string';
};

export function isComponentRef(anyValue: unknown): anyValue is ComponentRef {
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

export function isSchemaComponentRef(
  anyValue: unknown
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith(schemaComponentRefPrefix);
}

export const responseComponentRefPrefix = '#/components/responses/';

export function isResponseComponentRef(
  anyValue: unknown
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith(responseComponentRefPrefix);
}

export const parameterComponentRefPrefix = '#/components/parameters/';

export function isParameterComponentRef(
  anyValue: unknown
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith(parameterComponentRefPrefix);
}

export const securitySchemeComponentRefPrefix = '#/components/securitySchemes/';

export function isSecuritySchemesComponentRef(
  anyValue: unknown
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith(securitySchemeComponentRefPrefix);
}

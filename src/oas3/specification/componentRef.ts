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

export function isSchemaComponentRef(anyValue: any): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith('#/components/schemas/');
}

export function isResponseComponentRef(
  anyValue: any
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith('#/components/responses/');
}

export function isParameterComponentRef(
  anyValue: any
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith('#/components/parameters/');
}

export function isSecuritySchemesComponentRef(
  anyValue: any
): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (!isComponentRef(value)) {
    return false;
  }
  return value.$ref.startsWith('#/components/securitySchemes/');
}

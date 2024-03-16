export type ComponentRef = {
  $ref: 'string';
};

export function isComponentRef(anyValue: any): anyValue is ComponentRef {
  const value = anyValue as ComponentRef;
  if (typeof value !== 'object') {
    return false;
  }
  if (value.$ref !== 'string') {
    return false;
  }
  return true;
}

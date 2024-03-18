export type SecurityScheme = {
  type: 'http';
  scheme: 'basic' | 'bearer';
};

export function isSecurityScheme(anyValue: any): anyValue is SecurityScheme {
  const value = anyValue as SecurityScheme;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  if (value.type !== 'http') {
    return false;
  }
  if (value.scheme !== 'basic' && value.scheme !== 'bearer') {
    return false;
  }
  return true;
}

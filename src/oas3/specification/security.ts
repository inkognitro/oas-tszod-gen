type PermissionsBySecurityName = {
  [securityName: string]: string[];
};

function isPermissionsBySecurityName(
  anyValue: any
): anyValue is PermissionsBySecurityName {
  const value = anyValue as PermissionsBySecurityName;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  const securityNames = Object.values(value);
  for (const securityName in securityNames) {
    const permissions = securityNames[securityName];
    if (!Array.isArray(permissions)) {
      return false;
    }
    if (permissions.find(p => typeof p !== 'string')) {
      return false;
    }
  }
  return true;
}

export type PermissionsBySecurityNameArray = PermissionsBySecurityName[];

export function isPermissionsBySecurityNameArray(
  anyValue: any
): anyValue is PermissionsBySecurityNameArray {
  const value = anyValue as PermissionsBySecurityNameArray;
  if (!Array.isArray(value)) {
    return false;
  }
  if (value.find(v => !isPermissionsBySecurityName(v))) {
    return false;
  }
  return true;
}

export type ComponentSecurityScheme = {
  type: 'http';
  scheme: 'basic' | 'bearer';
};

export function isComponentSecurityScheme(
  anyValue: any
): anyValue is ComponentSecurityScheme {
  const value = anyValue as ComponentSecurityScheme;
  if (typeof value !== 'object' || !Array.isArray(value)) {
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

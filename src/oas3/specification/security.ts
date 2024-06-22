export type HttpSecurityScheme = {
  type: 'http';
  scheme: 'basic' | 'bearer';
};

export function isHttpSecurityScheme(
  anyValue: unknown
): anyValue is HttpSecurityScheme {
  const value = anyValue as HttpSecurityScheme;
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

export type ApiKeySecurityScheme = {
  type: 'apiKey';
  name: string;
  in: 'header' | 'query' | 'cookie';
};

const apiKeySecuritySchemeLocations = ['header', 'query', 'cookie'];

export function isApiKeySecurityScheme(
  anyValue: unknown
): anyValue is ApiKeySecurityScheme {
  const value = anyValue as ApiKeySecurityScheme;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  if (value.type !== 'apiKey') {
    return false;
  }
  if (typeof value.name !== 'string') {
    return false;
  }
  if (!apiKeySecuritySchemeLocations.includes(value.in)) {
    return false;
  }
  return true;
}

type OAuth2SecuritySchemeScopeDescriptionByName = {
  [scopeName: string]: string;
};

type OAuth2SecuritySchemeFlows = {
  implicit?: {
    authorizationUrl: string;
    scopes?: OAuth2SecuritySchemeScopeDescriptionByName;
  };
};

function isOAuth2SecuritySchemeFlows(
  anyValue: unknown
): anyValue is OAuth2SecuritySchemeFlows {
  const value = anyValue as OAuth2SecuritySchemeFlows;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  if (value.implicit) {
    if (typeof value.implicit !== 'object') {
      return false;
    }
    if (typeof value.implicit.authorizationUrl !== 'string') {
      return false;
    }
    if (value.implicit.scopes) {
      if (typeof value.implicit.scopes !== 'object') {
        return false;
      }
      for (const scopeName in value.implicit.scopes) {
        const description = value.implicit.scopes[scopeName];
        if (typeof description !== 'string') {
          return false;
        }
      }
    }
  }
  return true;
}

export type OAuth2SecurityScheme = {
  type: 'oauth2';
  flows: OAuth2SecuritySchemeFlows;
};

export function isOAuth2SecurityScheme(
  anyValue: unknown
): anyValue is OAuth2SecurityScheme {
  const value = anyValue as OAuth2SecurityScheme;
  if (typeof value !== 'object' || Array.isArray(value)) {
    return false;
  }
  if (value.type !== 'oauth2') {
    return false;
  }
  if (value.flows && !isOAuth2SecuritySchemeFlows(value.flows)) {
    return false;
  }
  return true;
}

export type SecurityScheme = HttpSecurityScheme | OAuth2SecurityScheme;

export function isSecurityScheme(
  anyValue: unknown
): anyValue is SecurityScheme {
  return (
    isHttpSecurityScheme(anyValue) ||
    isApiKeySecurityScheme(anyValue) ||
    isOAuth2SecurityScheme(anyValue)
  );
}

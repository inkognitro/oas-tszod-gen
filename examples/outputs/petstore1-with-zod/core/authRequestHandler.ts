import {Request, RequestHandler, RequestResult} from './core';

function base64Encode(value: string): string {
  // @ts-ignore
  const isBrowserEnv = typeof window !== 'undefined';
  const buffer = Buffer.from(value);
  return isBrowserEnv ? btoa(value) : buffer.toString('base64');
}

export type BasicAuthProvider = {
  type: 'basic';
  securitySchemeName: string;
  findUserCredentials: () => null | {username: string; password: string};
};

export type BearerAuthProvider = {
  type: 'bearer';
  securitySchemeName: string;
  findToken: () => null | string;
};

export type ApiKeyAuthProvider = {
  type: 'apiKey';
  securitySchemeName: string;
  apiKeyParamLocation: 'header' | 'query' | 'cookie';
  apiKeyParamName: string;
  findApiKey: () => null | string;
};

export type AuthProvider =
  | BasicAuthProvider
  | BearerAuthProvider
  | ApiKeyAuthProvider;

export type AuthRequestHandlerExecutionConfig = {
  preventAuthentication?: boolean;
};

export class AuthRequestHandler implements RequestHandler {
  private readonly authenticationProviders: AuthProvider[];
  private readonly nextRequestHandler: RequestHandler;

  constructor(
    authenticationProviders: AuthProvider[],
    nextRequestHandler: RequestHandler
  ) {
    this.authenticationProviders = authenticationProviders;
    this.nextRequestHandler = nextRequestHandler;
    this.execute = this.execute.bind(this);
    this.createRequestWithPotentialAuthenticationData =
      this.createRequestWithPotentialAuthenticationData.bind(this);
    this.cancelRequestById = this.cancelRequestById.bind(this);
    this.cancelAllRequests = this.cancelAllRequests.bind(this);
  }

  execute(
    request: Request,
    config?: AuthRequestHandlerExecutionConfig
  ): Promise<RequestResult> {
    return this.nextRequestHandler.execute(
      this.createRequestWithPotentialAuthenticationData(request, config),
      config
    );
  }

  private createRequestWithPotentialAuthenticationData(
    request: Request,
    config?: AuthRequestHandlerExecutionConfig
  ): Request {
    if (config?.preventAuthentication) {
      return request;
    }
    for (const index in request.endpointSchema.supportedSecuritySchemas) {
      const securitySchemaName =
        request.endpointSchema.supportedSecuritySchemas[index].name;
      const authProvider = this.authenticationProviders.find(
        p => p.securitySchemeName === securitySchemaName
      );
      if (!authProvider) {
        continue;
      }
      switch (authProvider.type) {
        case 'basic':
          const userCredentials = authProvider.findUserCredentials();
          if (!userCredentials) {
            return request;
          }
          const base64CredentialsStr = base64Encode(
            `${userCredentials.username}:${userCredentials.password}`
          );
          return {
            ...request,
            headers: {
              ...request.headers,
              Authorization: `Basic ${base64CredentialsStr}`,
            },
          };
        case 'bearer':
          const httpBearerToken = authProvider.findToken();
          if (!httpBearerToken) {
            return request;
          }
          return {
            ...request,
            headers: {
              ...(request.headers ?? {}),
              Authorization: `Bearer ${httpBearerToken}`,
            },
          };
        case 'apiKey':
          const apiKey = authProvider.findApiKey();
          if (!apiKey) {
            return request;
          }
          const paramName = authProvider.apiKeyParamName;
          switch (authProvider.apiKeyParamLocation) {
            case 'header':
              return {
                ...request,
                headers: {
                  ...(request.headers ?? {}),
                  [paramName]: apiKey,
                },
              };
            case 'cookie':
              return {
                ...request,
                cookies: {
                  ...(request.cookies ?? {}),
                  [paramName]: apiKey,
                },
              };
            case 'query':
              return {
                ...request,
                queryParams: {
                  ...(request.queryParams ?? {}),
                  [paramName]: apiKey,
                },
              };
            default:
              return request;
          }
      }
    }
    return request;
  }

  cancelRequestById(requestId: string): void {
    this.nextRequestHandler.cancelRequestById(requestId);
  }

  cancelAllRequests() {
    this.nextRequestHandler.cancelAllRequests();
  }
}

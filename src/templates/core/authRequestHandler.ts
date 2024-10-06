import {Request, RequestHandler, RequestResult} from './core';

export type HttpBasicAuthenticationProvider = {
  type: 'httpBasic';
  securitySchemeName: string;
  findToken: () => null | string;
};

export type HttpBearerAuthenticationProvider = {
  type: 'httpBearer';
  securitySchemeName: string;
  findToken: () => null | string;
};

export type AuthenticationProvider =
  | HttpBasicAuthenticationProvider
  | HttpBearerAuthenticationProvider;

export type AuthRequestHandlerExecutionConfig = {
  preventAuthentication?: boolean;
};

export class AuthRequestHandler implements RequestHandler {
  private readonly authenticationProviders: AuthenticationProvider[];
  private readonly nextRequestHandler: RequestHandler;

  constructor(
    authenticationProviders: AuthenticationProvider[],
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
      const accessToken = authProvider.findToken();
      if (!accessToken) {
        return request;
      }
      switch (authProvider.type) {
        case 'httpBasic':
          return {
            ...request,
            headers: {
              ...request.headers,
              Authorization: accessToken,
              securityScheme: securitySchemaName,
            },
          };
        case 'httpBearer':
          return {
            ...request,
            headers: {
              ...request.headers,
              Authorization: `Bearer ${accessToken}`,
              securityScheme: securitySchemaName,
            },
          };
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

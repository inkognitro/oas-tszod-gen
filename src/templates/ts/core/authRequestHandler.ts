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

interface RequestExecutionConfig {
  preventAuthentication?: boolean;
}

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
    config?: RequestExecutionConfig
  ): Promise<RequestResult> {
    return this.nextRequestHandler.execute(
      this.createRequestWithPotentialAuthenticationData(request, config),
      config
    );
  }

  private createRequestWithPotentialAuthenticationData(
    request: Request,
    config?: RequestExecutionConfig
  ): Request {
    if (config?.preventAuthentication) {
      return request;
    }
    for (const index in request.supportedSecuritySchemes) {
      const securitySchemeName = request.supportedSecuritySchemes[index].name;
      const securityScheme = this.authenticationProviders.find(
        p => p.securitySchemeName === securitySchemeName
      );
      if (!securityScheme) {
        continue;
      }
      const accessToken = securityScheme.findToken();
      if (!accessToken) {
        return request;
      }
      switch (securityScheme.type) {
        case 'httpBasic':
          return {
            ...request,
            headers: {
              ...request.headers,
              Authorization: accessToken,
              securityScheme: securitySchemeName,
            },
          };
        case 'httpBearer':
          return {
            ...request,
            headers: {
              ...request.headers,
              Authorization: `Bearer ${accessToken}`,
              securityScheme: securitySchemeName,
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

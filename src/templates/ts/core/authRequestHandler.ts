import {
  Request,
  RequestExecutionConfig,
  RequestHandler,
  RequestResult,
} from './core';

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

export class AuthRequestHandler implements RequestHandler {
  private readonly authenticationProviders: AuthenticationProvider[];
  private readonly nextRequestHandler: RequestHandler;

  constructor(
    authenticationProviders: AuthenticationProvider[],
    nextRequestHandler: RequestHandler
  ) {
    this.authenticationProviders = authenticationProviders;
    this.nextRequestHandler = nextRequestHandler;
  }

  execute(
    request: Request,
    config?: RequestExecutionConfig
  ): Promise<RequestResult> {
    return this.nextRequestHandler.execute(
      this.createRequestWithAuthentication(request),
      config
    );
  }

  private createRequestWithAuthentication(request: Request): Request {
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
}

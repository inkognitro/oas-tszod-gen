import {
  Request,
  RequestExecutionConfig,
  RequestHandler,
  RequestResult,
} from './core';

export enum SecuritySchemeType {
  httpBearer = 'httpBearer',
  httpBasic = 'httpBasic',
  custom = 'custom',
}

type GenericSecurityScheme<
  T extends SecuritySchemeType,
  P extends object = {},
> = P & {type: T; name: string};

export type HttpBasicSecurityScheme = GenericSecurityScheme<
  SecuritySchemeType.httpBasic,
  {findToken: () => null | string}
>;

export type HttpBearerSecurityScheme = GenericSecurityScheme<
  SecuritySchemeType.httpBearer,
  {findToken: () => null | string}
>;

export type CustomSecuritySchemeRequestModificationResult = {
  request: Request;
  securityWasAppliedToRequest: boolean;
};

export type CustomSecurityScheme = GenericSecurityScheme<
  SecuritySchemeType.custom,
  {
    createModifiedRequest: (
      request: Request
    ) => CustomSecuritySchemeRequestModificationResult;
  }
>;

export type SecurityScheme =
  | HttpBasicSecurityScheme
  | HttpBearerSecurityScheme
  | CustomSecurityScheme;

export class AuthRequestHandler implements RequestHandler {
  private readonly supportedSecuritySchemes: SecurityScheme[];
  private readonly nextRequestHandler: RequestHandler;

  constructor(
    supportedSecuritySchemes: SecurityScheme[],
    nextRequestHandler: RequestHandler
  ) {
    this.supportedSecuritySchemes = supportedSecuritySchemes;
    this.nextRequestHandler = nextRequestHandler;
  }

  execute(
    request: Request,
    config?: RequestExecutionConfig
  ): Promise<RequestResult> {
    if (config?.doNotApplyAuthCredentials) {
      return this.nextRequestHandler.execute(request, config);
    }
    return this.nextRequestHandler.execute(
      this.createRequestWithAuthCredentials(request),
      config
    );
  }

  private createRequestWithAuthCredentials(request: Request): Request {
    for (const index in request.supportedSecuritySchemes) {
      const securitySchemeName = request.supportedSecuritySchemes[index];
      const securityScheme = this.supportedSecuritySchemes.find(
        s => s.name === securitySchemeName
      );
      if (!securityScheme) {
        continue;
      }
      switch (securityScheme.type) {
        case SecuritySchemeType.httpBasic:
          // eslint-disable-next-line no-case-declarations
          const httpBasicToken = securityScheme.findToken();
          if (httpBasicToken) {
            return {
              ...request,
              headers: {
                ...request.headers,
                Authorization: httpBasicToken,
                securityScheme: securitySchemeName,
              },
            };
          }
          break;
        case SecuritySchemeType.httpBearer:
          // eslint-disable-next-line no-case-declarations
          const httpBearerToken = securityScheme.findToken();
          if (httpBearerToken) {
            return {
              ...request,
              headers: {
                ...request.headers,
                Authorization: `Bearer ${httpBearerToken}`,
                securityScheme: securitySchemeName,
              },
            };
          }
          break;
        case SecuritySchemeType.custom:
          // eslint-disable-next-line no-case-declarations
          const result = securityScheme.createModifiedRequest(request);
          if (result.securityWasAppliedToRequest) {
            return result.request;
          }
          if (result.securityWasAppliedToRequest) {
            return {
              ...result.request,
              appliedSecurityScheme: securitySchemeName,
            };
          }
          break;
        default:
          // @ts-ignore
          throw new Error(`type "${securityScheme.type}" is not supported`);
      }
    }
    return request;
  }
}

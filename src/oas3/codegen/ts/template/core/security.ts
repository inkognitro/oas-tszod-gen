import {Request} from './core';

export enum SecuritySchemeType {
  httpBearer = 'httpBearer',
  httpBasic = 'httpBasic',
  custom = 'custom',
}

type GenericSecurityScheme<
  T extends SecuritySchemeType,
  P extends object = {},
> = P & {type: T; name: string};

type HttpBasicSecurityScheme = GenericSecurityScheme<
  SecuritySchemeType.httpBasic,
  {findToken: () => null | string}
>;

type HttpBearerSecurityScheme = GenericSecurityScheme<
  SecuritySchemeType.httpBearer,
  {findToken: () => null | string}
>;

type CustomSecuritySchemeRequestModificationResult = {
  request: Request;
  securityWasAppliedToRequest: boolean;
};

type CustomSecurityScheme = GenericSecurityScheme<
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

export class SecuritySchemesRequestModifier {
  private readonly securitySchemes: SecurityScheme[];

  constructor(securitySchemes: SecurityScheme[]) {
    this.securitySchemes = securitySchemes;
  }

  private getWithSecurityExtendedRequest(request: Request): Request {
    for (const index in request.supportedSecuritySchemes) {
      const securitySchemeName = request.supportedSecuritySchemes[index];
      const securityScheme = this.securitySchemes.find(
        s => s.name === securitySchemeName
      );
      if (!securityScheme) {
        console.warn(
          `security scheme with name "${securitySchemeName}" is ignored because it was not found`
        );
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
              securityScheme: securitySchemeName,
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

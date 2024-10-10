import {z_Apple_pay_domain, z_Error, Apple_pay_domain, Error} from './schemas';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

export const getApplePayDomainsDomainEndpointSchema = {
  path: '/v1/apple_pay/domains/{domain}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    domain: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Apple_pay_domain,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetApplePayDomainsDomainRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    domain: string;
  },
  {
    expand?: string[];
  }
>;

export type GetApplePayDomainsDomainResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Apple_pay_domain>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetApplePayDomainsDomainRequestResult = RequestResult<
  GetApplePayDomainsDomainRequest,
  GetApplePayDomainsDomainResponse
>;

export function getApplePayDomainsDomain(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApplePayDomainsDomainRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApplePayDomainsDomainRequestResult> {
  return requestHandler.execute(
    createRequest(getApplePayDomainsDomainEndpointSchema, payload),
    config
  );
}

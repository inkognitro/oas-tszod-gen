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

export const postApplePayDomainsEndpointSchema = {
  path: '/v1/apple_pay/domains',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        domain_name: z.string(),
        expand: z.array(z.string()).optional(),
      }),
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

export type PostApplePayDomainsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      domain_name: string;
      expand?: string[];
    }
  >
>;

export type PostApplePayDomainsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Apple_pay_domain>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostApplePayDomainsRequestResult = RequestResult<
  PostApplePayDomainsRequest,
  PostApplePayDomainsResponse
>;

export function postApplePayDomains(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostApplePayDomainsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplePayDomainsRequestResult> {
  return requestHandler.execute(
    createRequest(postApplePayDomainsEndpointSchema, payload),
    config
  );
}

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

export const getApplePayDomainsEndpointSchema = {
  path: '/v1/apple_pay/domains',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    domain_name: z.string().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
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
          zodSchema: z.object({
            data: z.array(z_Apple_pay_domain),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/apple_pay\/domains/),
          }),
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

export type GetApplePayDomainsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    domain_name?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetApplePayDomainsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Apple_pay_domain[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetApplePayDomainsRequestResult = RequestResult<
  GetApplePayDomainsRequest,
  GetApplePayDomainsResponse
>;

export function getApplePayDomains(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApplePayDomainsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApplePayDomainsRequestResult> {
  return requestHandler.execute(
    createRequest(getApplePayDomainsEndpointSchema, payload),
    config
  );
}

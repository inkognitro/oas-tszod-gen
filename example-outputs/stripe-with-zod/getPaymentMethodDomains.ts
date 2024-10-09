import {
  z_Payment_method_domain,
  z_Error,
  Payment_method_domain,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const getPaymentMethodDomainsEndpointSchema = {
  path: '/v1/payment_method_domains',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    domain_name: z.string().optional(),
    enabled: z.boolean().optional(),
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
            data: z.array(z_Payment_method_domain),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/payment_method_domains/),
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

export type GetPaymentMethodDomainsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    domain_name?: string;
    enabled?: boolean;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetPaymentMethodDomainsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Payment_method_domain[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentMethodDomainsRequestResult = RequestResult<
  GetPaymentMethodDomainsRequest,
  GetPaymentMethodDomainsResponse
>;

export function getPaymentMethodDomains(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentMethodDomainsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentMethodDomainsRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentMethodDomainsEndpointSchema, payload),
    config
  );
}

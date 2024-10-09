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

export const postPaymentMethodDomainsEndpointSchema = {
  path: '/v1/payment_method_domains',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        domain_name: z.string(),
        enabled: z.boolean().optional(),
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Payment_method_domain,
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

export type PostPaymentMethodDomainsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      domain_name: string;
      enabled?: boolean;
      expand?: string[];
    }
  >
>;

export type PostPaymentMethodDomainsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Payment_method_domain>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodDomainsRequestResult = RequestResult<
  PostPaymentMethodDomainsRequest,
  PostPaymentMethodDomainsResponse
>;

export function postPaymentMethodDomains(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodDomainsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodDomainsRequestResult> {
  return requestHandler.execute(
    createRequest(postPaymentMethodDomainsEndpointSchema, payload),
    config
  );
}

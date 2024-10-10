import {
  z_Payment_method_domain,
  z_Error,
  Payment_method_domain,
  Error,
} from './schemas';
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

export const postPaymentMethodDomainsPaymentMethodDomainEndpointSchema = {
  path: '/v1/payment_method_domains/{payment_method_domain}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    payment_method_domain: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
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

export type PostPaymentMethodDomainsPaymentMethodDomainRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      enabled?: boolean;
      expand?: string[];
    }
  >,
  {
    payment_method_domain: string;
  }
>;

export type PostPaymentMethodDomainsPaymentMethodDomainResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Payment_method_domain>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodDomainsPaymentMethodDomainRequestResult =
  RequestResult<
    PostPaymentMethodDomainsPaymentMethodDomainRequest,
    PostPaymentMethodDomainsPaymentMethodDomainResponse
  >;

export function postPaymentMethodDomainsPaymentMethodDomain(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodDomainsPaymentMethodDomainRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodDomainsPaymentMethodDomainRequestResult> {
  return requestHandler.execute(
    createRequest(
      postPaymentMethodDomainsPaymentMethodDomainEndpointSchema,
      payload
    ),
    config
  );
}

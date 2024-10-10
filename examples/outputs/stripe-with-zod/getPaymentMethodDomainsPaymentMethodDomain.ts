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

export const getPaymentMethodDomainsPaymentMethodDomainEndpointSchema = {
  path: '/v1/payment_method_domains/{payment_method_domain}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    payment_method_domain: z.string(),
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

export type GetPaymentMethodDomainsPaymentMethodDomainRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    payment_method_domain: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPaymentMethodDomainsPaymentMethodDomainResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Payment_method_domain>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentMethodDomainsPaymentMethodDomainRequestResult =
  RequestResult<
    GetPaymentMethodDomainsPaymentMethodDomainRequest,
    GetPaymentMethodDomainsPaymentMethodDomainResponse
  >;

export function getPaymentMethodDomainsPaymentMethodDomain(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentMethodDomainsPaymentMethodDomainRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentMethodDomainsPaymentMethodDomainRequestResult> {
  return requestHandler.execute(
    createRequest(
      getPaymentMethodDomainsPaymentMethodDomainEndpointSchema,
      payload
    ),
    config
  );
}

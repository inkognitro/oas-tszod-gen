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
import {Payment_method_domain, Error} from './schemas';

export const getPaymentMethodDomainsPaymentMethodDomainEndpointSchema = {
  path: '/v1/payment_method_domains/{payment_method_domain}',
  method: 'get',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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

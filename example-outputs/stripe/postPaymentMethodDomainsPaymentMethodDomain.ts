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
} from '@example-outputs/stripe/core';
import {Payment_method_domain, Error} from '@example-outputs/stripe';

export const postPaymentMethodDomainsPaymentMethodDomainEndpointSchema = {
  path: '/v1/payment_method_domains/{payment_method_domain}',
  method: 'post',
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

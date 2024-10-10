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

export const postPaymentMethodDomainsPaymentMethodDomainValidateEndpointSchema =
  {
    path: '/v1/payment_method_domains/{payment_method_domain}/validate',
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

export type PostPaymentMethodDomainsPaymentMethodDomainValidateRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        expand?: string[];
      }
    >,
    {
      payment_method_domain: string;
    }
  >;

export type PostPaymentMethodDomainsPaymentMethodDomainValidateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Payment_method_domain>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPaymentMethodDomainsPaymentMethodDomainValidateRequestResult =
  RequestResult<
    PostPaymentMethodDomainsPaymentMethodDomainValidateRequest,
    PostPaymentMethodDomainsPaymentMethodDomainValidateResponse
  >;

export function postPaymentMethodDomainsPaymentMethodDomainValidate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPaymentMethodDomainsPaymentMethodDomainValidateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPaymentMethodDomainsPaymentMethodDomainValidateRequestResult> {
  return requestHandler.execute(
    createRequest(
      postPaymentMethodDomainsPaymentMethodDomainValidateEndpointSchema,
      payload
    ),
    config
  );
}

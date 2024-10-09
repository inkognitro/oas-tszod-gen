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
import {Deleted_apple_pay_domain, Error} from '@example-outputs/stripe';

export const deleteApplePayDomainsDomainEndpointSchema = {
  path: '/v1/apple_pay/domains/{domain}',
  method: 'delete',
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

export type DeleteApplePayDomainsDomainRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    domain: string;
  }
>;

export type DeleteApplePayDomainsDomainResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_apple_pay_domain>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteApplePayDomainsDomainRequestResult = RequestResult<
  DeleteApplePayDomainsDomainRequest,
  DeleteApplePayDomainsDomainResponse
>;

export function deleteApplePayDomainsDomain(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteApplePayDomainsDomainRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApplePayDomainsDomainRequestResult> {
  return requestHandler.execute(
    createRequest(deleteApplePayDomainsDomainEndpointSchema, payload),
    config
  );
}

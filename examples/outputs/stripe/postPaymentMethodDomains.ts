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

export const postPaymentMethodDomainsEndpointSchema = {
  path: '/v1/payment_method_domains',
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

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

export const getPaymentMethodDomainsEndpointSchema = {
  path: '/v1/payment_method_domains',
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

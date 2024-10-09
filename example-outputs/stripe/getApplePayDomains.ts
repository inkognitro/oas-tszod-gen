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
import {Apple_pay_domain, Error} from '@example-outputs/stripe';

export const getApplePayDomainsEndpointSchema = {
  path: '/v1/apple_pay/domains',
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

export type GetApplePayDomainsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    domain_name?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetApplePayDomainsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Apple_pay_domain[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetApplePayDomainsRequestResult = RequestResult<
  GetApplePayDomainsRequest,
  GetApplePayDomainsResponse
>;

export function getApplePayDomains(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApplePayDomainsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApplePayDomainsRequestResult> {
  return requestHandler.execute(
    createRequest(getApplePayDomainsEndpointSchema, payload),
    config
  );
}

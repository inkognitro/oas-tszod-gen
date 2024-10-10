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
import {Apple_pay_domain, Error} from './schemas';

export const getApplePayDomainsDomainEndpointSchema = {
  path: '/v1/apple_pay/domains/{domain}',
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

export type GetApplePayDomainsDomainRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    domain: string;
  },
  {
    expand?: string[];
  }
>;

export type GetApplePayDomainsDomainResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Apple_pay_domain>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetApplePayDomainsDomainRequestResult = RequestResult<
  GetApplePayDomainsDomainRequest,
  GetApplePayDomainsDomainResponse
>;

export function getApplePayDomainsDomain(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetApplePayDomainsDomainRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetApplePayDomainsDomainRequestResult> {
  return requestHandler.execute(
    createRequest(getApplePayDomainsDomainEndpointSchema, payload),
    config
  );
}

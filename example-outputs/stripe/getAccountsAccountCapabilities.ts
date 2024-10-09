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
import {Capability, Error} from '@example-outputs/stripe';

export const getAccountsAccountCapabilitiesEndpointSchema = {
  path: '/v1/accounts/{account}/capabilities',
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

export type GetAccountsAccountCapabilitiesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    account: string;
  },
  {
    expand?: string[];
  }
>;

export type GetAccountsAccountCapabilitiesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Capability[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetAccountsAccountCapabilitiesRequestResult = RequestResult<
  GetAccountsAccountCapabilitiesRequest,
  GetAccountsAccountCapabilitiesResponse
>;

export function getAccountsAccountCapabilities(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetAccountsAccountCapabilitiesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountsAccountCapabilitiesRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountsAccountCapabilitiesEndpointSchema, payload),
    config
  );
}

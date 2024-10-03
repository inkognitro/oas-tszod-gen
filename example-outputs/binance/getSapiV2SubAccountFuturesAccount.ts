import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {
  SubAccountUSDTFuturesDetails,
  SubAccountCOINFuturesDetails,
  Error,
} from '@example-outputs/binance';

export const getSapiV2SubAccountFuturesAccountEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetSapiV2SubAccountFuturesAccountRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    futuresType: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV2SubAccountFuturesAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesDetails | SubAccountCOINFuturesDetails
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2SubAccountFuturesAccountRequestResult = RequestResult<
  GetSapiV2SubAccountFuturesAccountRequest,
  GetSapiV2SubAccountFuturesAccountResponse
>;

export function getSapiV2SubAccountFuturesAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2SubAccountFuturesAccountRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV2SubAccountFuturesAccountEndpointSchema, payload),
    config
  );
}

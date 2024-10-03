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
import {Error} from '@example-outputs/binance';

export const getSapiV1SimpleEarnAccountEndpointSchema = {
  path: '/sapi/v1/simple-earn/account',
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

export type GetSapiV1SimpleEarnAccountRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SimpleEarnAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalAmountInBTC: string;
          totalAmountInUSDT: string;
          totalFlexibleAmountInBTC: string;
          totalFlexibleAmountInUSDT: string;
          totalLockedInBTC: string;
          totalLockedInUSDT: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnAccountRequestResult = RequestResult<
  GetSapiV1SimpleEarnAccountRequest,
  GetSapiV1SimpleEarnAccountResponse
>;

export function getSapiV1SimpleEarnAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1SimpleEarnAccountRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnAccountRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1SimpleEarnAccountEndpointSchema, payload),
    config
  );
}

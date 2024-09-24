import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1SimpleEarnAccountEndpointSchema = {
  path: '/sapi/v1/simple-earn/account',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1SimpleEarnAccountPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnAccountResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SimpleEarnAccountRequestResult = RequestResult<
  Request,
  GetSapiV1SimpleEarnAccountResponse
>;

export function getSapiV1SimpleEarnAccount(
  requestHandler: RequestHandler,
  payload: GetSapiV1SimpleEarnAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SimpleEarnAccountEndpointSchema,
    }),
    config
  );
}

import {
  SubAccountUSDTFuturesPositionRisk,
  SubAccountCOINFuturesPositionRisk,
  Error,
} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV2SubAccountFuturesPositionriskEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/positionRisk',
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

export type GetSapiV2SubAccountFuturesPositionriskPayload = {
  queryParams: {
    email: string;
    futuresType: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2SubAccountFuturesPositionriskResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesPositionRisk | SubAccountCOINFuturesPositionRisk
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2SubAccountFuturesPositionriskRequestResult = RequestResult<
  Request,
  GetSapiV2SubAccountFuturesPositionriskResponse
>;

export function getSapiV2SubAccountFuturesPositionrisk(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2SubAccountFuturesPositionriskPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesPositionriskRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2SubAccountFuturesPositionriskEndpointSchema,
    }),
    config
  );
}

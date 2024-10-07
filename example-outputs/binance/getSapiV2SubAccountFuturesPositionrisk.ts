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
  SubAccountUSDTFuturesPositionRisk,
  SubAccountCOINFuturesPositionRisk,
  Error,
} from '@example-outputs/binance';

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

export type GetSapiV2SubAccountFuturesPositionriskRequest = RequestUnion<
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

export type GetSapiV2SubAccountFuturesPositionriskResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        SubAccountUSDTFuturesPositionRisk | SubAccountCOINFuturesPositionRisk
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV2SubAccountFuturesPositionriskRequestResult = RequestResult<
  GetSapiV2SubAccountFuturesPositionriskRequest,
  GetSapiV2SubAccountFuturesPositionriskResponse
>;

export function getSapiV2SubAccountFuturesPositionrisk(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV2SubAccountFuturesPositionriskRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesPositionriskRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV2SubAccountFuturesPositionriskEndpointSchema,
      payload
    ),
    config
  );
}

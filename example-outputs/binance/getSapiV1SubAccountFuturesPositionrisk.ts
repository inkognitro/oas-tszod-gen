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

export const getSapiV1SubAccountFuturesPositionriskEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/positionRisk',
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

export type GetSapiV1SubAccountFuturesPositionriskRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SubAccountFuturesPositionriskResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          entryPrice: string;
          leverage: string;
          maxNotional: string;
          liquidationPrice: string;
          markPrice: string;
          positionAmount: string;
          symbol: string;
          unrealizedProfit: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountFuturesPositionriskRequestResult = RequestResult<
  GetSapiV1SubAccountFuturesPositionriskRequest,
  GetSapiV1SubAccountFuturesPositionriskResponse
>;

export function getSapiV1SubAccountFuturesPositionrisk(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SubAccountFuturesPositionriskRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountFuturesPositionriskRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SubAccountFuturesPositionriskEndpointSchema,
      payload
    ),
    config
  );
}

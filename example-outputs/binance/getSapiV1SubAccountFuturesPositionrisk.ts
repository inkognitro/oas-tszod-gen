import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetSapiV1SubAccountFuturesPositionriskPayload = {
  queryParams: {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  GetSapiV1SubAccountFuturesPositionriskResponse
>;

export function getSapiV1SubAccountFuturesPositionrisk(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountFuturesPositionriskPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountFuturesPositionriskRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountFuturesPositionriskEndpointSchema,
    }),
    config
  );
}

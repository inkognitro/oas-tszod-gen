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

export const getSapiV1AccountApitradingstatusEndpointSchema = {
  path: '/sapi/v1/account/apiTradingStatus',
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

export type GetSapiV1AccountApitradingstatusPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AccountApitradingstatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: {
            isLocked: boolean;
            plannedRecoverTime: number; // int
            triggerCondition: {
              GCR: number; // int
              IFER: number; // int
              UFR: number; // int
            };
            indicators: {
              BTCUSDT: {
                i: string;
                c: number; // int
                v: number;
                t: number;
              }[];
            };
            updateTime: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AccountApitradingstatusRequestResult = RequestResult<
  Request,
  GetSapiV1AccountApitradingstatusResponse
>;

export function getSapiV1AccountApitradingstatus(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AccountApitradingstatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AccountApitradingstatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AccountApitradingstatusEndpointSchema,
    }),
    config
  );
}

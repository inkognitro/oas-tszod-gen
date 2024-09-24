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

export const getSapiV1MarginExchangeSmallLiabilityHistoryEndpointSchema = {
  path: '/sapi/v1/margin/exchange-small-liability-history',
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

export type GetSapiV1MarginExchangeSmallLiabilityHistoryPayload = {
  queryParams: {
    current?: number; // int
    size?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginExchangeSmallLiabilityHistoryResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            total: number; // int
            rows: {
              asset: string;
              amount: string;
              targetAsset: string;
              targetAmount: string;
              bizType: string;
              timestamp: number; // int
            }[];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginExchangeSmallLiabilityHistoryRequestResult =
  RequestResult<Request, GetSapiV1MarginExchangeSmallLiabilityHistoryResponse>;

export function getSapiV1MarginExchangeSmallLiabilityHistory(
  requestHandler: RequestHandler,
  payload: GetSapiV1MarginExchangeSmallLiabilityHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginExchangeSmallLiabilityHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1MarginExchangeSmallLiabilityHistoryEndpointSchema,
    }),
    config
  );
}

import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1ConvertTradeflowEndpointSchema = {
  path: '/sapi/v1/convert/tradeFlow',
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

export type GetSapiV1ConvertTradeflowPayload = {
  queryParams: {
    startTime: number; // int
    endTime: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ConvertTradeflowResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          list: {
            quoteId: string;
            orderId: number; // int
            orderStatus: string;
            fromAsset: string;
            fromAmount: string;
            toAsset: string;
            toAmount: string;
            ratio: string;
            inverseRatio: string;
            createTime: number; // int
          }[];
          startTime: number; // int
          endTime: number; // int
          limit: number; // int
          moreData: boolean;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertTradeflowRequestResult = RequestResult<
  Request,
  GetSapiV1ConvertTradeflowResponse
>;

export function getSapiV1ConvertTradeflow(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ConvertTradeflowPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertTradeflowRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ConvertTradeflowEndpointSchema,
    }),
    config
  );
}

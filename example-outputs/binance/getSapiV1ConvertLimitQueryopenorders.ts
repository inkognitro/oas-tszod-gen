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

export const getSapiV1ConvertLimitQueryopenordersEndpointSchema = {
  path: '/sapi/v1/convert/limit/queryOpenOrders',
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

export type GetSapiV1ConvertLimitQueryopenordersPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ConvertLimitQueryopenordersResponse =
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
            expiredTimestamp: number; // int
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertLimitQueryopenordersRequestResult = RequestResult<
  Request,
  GetSapiV1ConvertLimitQueryopenordersResponse
>;

export function getSapiV1ConvertLimitQueryopenorders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ConvertLimitQueryopenordersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertLimitQueryopenordersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ConvertLimitQueryopenordersEndpointSchema,
    }),
    config
  );
}

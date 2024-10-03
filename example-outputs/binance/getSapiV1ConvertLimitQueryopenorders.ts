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

export const getSapiV1ConvertLimitQueryopenordersEndpointSchema = {
  path: '/sapi/v1/convert/limit/queryOpenOrders',
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

export type GetSapiV1ConvertLimitQueryopenordersRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1ConvertLimitQueryopenordersResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertLimitQueryopenordersRequestResult = RequestResult<
  GetSapiV1ConvertLimitQueryopenordersRequest,
  GetSapiV1ConvertLimitQueryopenordersResponse
>;

export function getSapiV1ConvertLimitQueryopenorders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ConvertLimitQueryopenordersRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertLimitQueryopenordersRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1ConvertLimitQueryopenordersEndpointSchema, payload),
    config
  );
}

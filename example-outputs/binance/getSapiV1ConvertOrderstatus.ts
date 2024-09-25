import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1ConvertOrderstatusEndpointSchema = {
  path: '/sapi/v1/convert/orderStatus',
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

export type GetSapiV1ConvertOrderstatusPayload = {
  queryParams: {
    orderId?: string;
    quoteId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ConvertOrderstatusResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            orderId: number; // int
            orderStatus: string;
            fromAsset: string;
            fromAmount: string;
            toAsset: string;
            toAmount: string;
            ratio: string;
            inverseRatio: string;
            createTime: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1ConvertOrderstatusRequestResult = RequestResult<
  Request,
  GetSapiV1ConvertOrderstatusResponse
>;

export function getSapiV1ConvertOrderstatus(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ConvertOrderstatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertOrderstatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ConvertOrderstatusEndpointSchema,
    }),
    config
  );
}

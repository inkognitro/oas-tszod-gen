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

export const getSapiV1ConvertOrderstatusEndpointSchema = {
  path: '/sapi/v1/convert/orderStatus',
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

export type GetSapiV1ConvertOrderstatusRequest = RequestUnion<
  any,
  any,
  {
    orderId?: string;
    quoteId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1ConvertOrderstatusResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertOrderstatusRequestResult = RequestResult<
  GetSapiV1ConvertOrderstatusRequest,
  GetSapiV1ConvertOrderstatusResponse
>;

export function getSapiV1ConvertOrderstatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ConvertOrderstatusRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertOrderstatusRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1ConvertOrderstatusEndpointSchema, payload),
    config
  );
}

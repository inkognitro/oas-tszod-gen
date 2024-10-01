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

export const getSapiV1FiatOrdersEndpointSchema = {
  path: '/sapi/v1/fiat/orders',
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

export type GetSapiV1FiatOrdersPayload = {
  queryParams: {
    transactionType: number; // int
    beginTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    rows?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1FiatOrdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            orderNo: string;
            fiatCurrency: string;
            indicatedAmount: string;
            amount: string;
            totalFee: string;
            method: string;
            status: string;
            createTime: number; // int
            updateTime: number; // int
          }[];
          total: number; // int
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1FiatOrdersRequestResult = RequestResult<
  Request,
  GetSapiV1FiatOrdersResponse
>;

export function getSapiV1FiatOrders(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1FiatOrdersPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1FiatOrdersRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1FiatOrdersEndpointSchema,
    }),
    config
  );
}

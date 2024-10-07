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

export const getSapiV1FiatPaymentsEndpointSchema = {
  path: '/sapi/v1/fiat/payments',
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

export type GetSapiV1FiatPaymentsRequest = RequestUnion<
  any,
  any,
  {
    transactionType: number; // int
    beginTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    rows?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1FiatPaymentsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            orderNo: string;
            sourceAmount: string;
            fiatCurrency: string;
            obtainAmount: string;
            cryptoCurrency: string;
            totalFee: string;
            price: string;
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

export type GetSapiV1FiatPaymentsRequestResult = RequestResult<
  GetSapiV1FiatPaymentsRequest,
  GetSapiV1FiatPaymentsResponse
>;

export function getSapiV1FiatPayments(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1FiatPaymentsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1FiatPaymentsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1FiatPaymentsEndpointSchema, payload),
    config
  );
}

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

export type GetSapiV1FiatPaymentsPayload = {
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
  Request,
  GetSapiV1FiatPaymentsResponse
>;

export function getSapiV1FiatPayments(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1FiatPaymentsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1FiatPaymentsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1FiatPaymentsEndpointSchema,
    }),
    config
  );
}

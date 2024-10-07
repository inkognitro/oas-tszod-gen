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

export const getSapiV1PayTransactionsEndpointSchema = {
  path: '/sapi/v1/pay/transactions',
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

export type GetSapiV1PayTransactionsRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1PayTransactionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            orderType: string;
            transactionId: string;
            transactionTime: number; // int
            amount: string;
            currency: string;
            walletType: number; // int
            walletTypes: number[]; // item: int
            fundsDetail: {
              currency: string;
              amount: string;
            }[];
            payerInfo: {
              name: string;
              type: string;
              binanceId: string;
              accountId: string;
            };
            receiverInfo: {
              name: string;
              type: string;
              email: string;
              binanceId: string;
              accountId: string;
              countryCode: string;
              phoneNumber: string;
              mobileCode: string;
              extend?: {
                institutionName: string;
                cardNumber: string;
                digitalWalletId: string;
              }[];
            };
          }[];
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PayTransactionsRequestResult = RequestResult<
  GetSapiV1PayTransactionsRequest,
  GetSapiV1PayTransactionsResponse
>;

export function getSapiV1PayTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1PayTransactionsRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PayTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1PayTransactionsEndpointSchema, payload),
    config
  );
}

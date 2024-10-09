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

export const getTransactionsEndpointSchema = {
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

export type GetTransactionsRequest = RequestUnion<
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

export type GetTransactionsResponse =
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

export type GetTransactionsRequestResult = RequestResult<
  GetTransactionsRequest,
  GetTransactionsResponse
>;

export function getTransactions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetTransactionsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest(getTransactionsEndpointSchema, payload),
    config
  );
}

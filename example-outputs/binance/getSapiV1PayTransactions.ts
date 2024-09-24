import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1PayTransactionsEndpointSchema = {
  path: '/sapi/v1/pay/transactions',
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

export type GetSapiV1PayTransactionsPayload = {
  queryParams: {
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1PayTransactionsResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1PayTransactionsRequestResult = RequestResult<
  Request,
  GetSapiV1PayTransactionsResponse
>;

export function getSapiV1PayTransactions(
  requestHandler: RequestHandler,
  payload: GetSapiV1PayTransactionsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1PayTransactionsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1PayTransactionsEndpointSchema,
    }),
    config
  );
}

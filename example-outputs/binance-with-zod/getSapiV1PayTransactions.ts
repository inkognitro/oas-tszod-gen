import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1PayTransactionsEndpointSchema = {
  path: '/sapi/v1/pay/transactions',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            code: z.string(),
            message: z.string(),
            data: z.array(
              z.object({
                orderType: z.string(),
                transactionId: z.string(),
                transactionTime: z.number().int().safe().finite(),
                amount: z.string(),
                currency: z.string(),
                walletType: z.number().int().safe().finite(),
                walletTypes: z.array(z.number().int().safe().finite()),
                fundsDetail: z.array(
                  z.object({
                    currency: z.string(),
                    amount: z.string(),
                  })
                ),
                payerInfo: z.object({
                  name: z.string(),
                  type: z.string(),
                  binanceId: z.string(),
                  accountId: z.string(),
                }),
                receiverInfo: z.object({
                  name: z.string(),
                  type: z.string(),
                  email: z.string(),
                  binanceId: z.string(),
                  accountId: z.string(),
                  countryCode: z.string(),
                  phoneNumber: z.string(),
                  mobileCode: z.string(),
                  extend: z
                    .array(
                      z.object({
                        institutionName: z.string(),
                        cardNumber: z.string(),
                        digitalWalletId: z.string(),
                      })
                    )
                    .optional(),
                }),
              })
            ),
            success: z.boolean(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1PayTransactionsRequestResult = RequestResult<
  Request,
  GetSapiV1PayTransactionsResponse
>;

export function getSapiV1PayTransactions(
  requestHandler: SimpleRequestHandler,
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

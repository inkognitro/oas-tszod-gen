import {z_Error, Error} from '../../../';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';

export const getTransactionsEndpointSchema = {
  path: '/sapi/v1/pay/transactions',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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

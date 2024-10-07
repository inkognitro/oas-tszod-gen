import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MiningPaymentOtherEndpointSchema = {
  path: '/sapi/v1/mining/payment/other',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    algo: z.string(),
    userName: z.string(),
    coin: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    pageIndex: z.number().int().safe().finite().optional(),
    pageSize: z.string().optional(),
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
            code: z.number().int().safe().finite(),
            msg: z.string(),
            data: z.object({
              otherProfits: z.array(
                z.object({
                  time: z.number().int().safe().finite(),
                  coinName: z.string(),
                  type: z.number().int().safe().finite(),
                  profitAmount: z.number().safe().finite(),
                  status: z.number().int().safe().finite(),
                })
              ),
              totalNum: z.number().int().safe().finite(),
              pageSize: z.number().int().safe().finite(),
            }),
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

export type GetSapiV1MiningPaymentOtherRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    userName: string;
    coin?: string;
    startDate?: string;
    endDate?: string;
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningPaymentOtherResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            otherProfits: {
              time: number; // int
              coinName: string;
              type: number; // int
              profitAmount: number;
              status: number; // int
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningPaymentOtherRequestResult = RequestResult<
  GetSapiV1MiningPaymentOtherRequest,
  GetSapiV1MiningPaymentOtherResponse
>;

export function getSapiV1MiningPaymentOther(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MiningPaymentOtherRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPaymentOtherRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningPaymentOtherEndpointSchema, payload),
    config
  );
}

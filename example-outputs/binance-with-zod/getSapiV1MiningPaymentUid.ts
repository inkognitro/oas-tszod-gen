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

export const getSapiV1MiningPaymentUidEndpointSchema = {
  path: '/sapi/v1/mining/payment/uid',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    algo: z.string(),
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
              accountProfits: z.array(
                z.object({
                  time: z.number().int().safe().finite(),
                  coinName: z.string(),
                  type: z.number().int().safe().finite(),
                  puid: z.number().int().safe().finite(),
                  subName: z.string(),
                  amount: z.number().safe().finite(),
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

export type GetSapiV1MiningPaymentUidRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    startDate?: string;
    endDate?: string;
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningPaymentUidResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            accountProfits: {
              time: number; // int
              coinName: string;
              type: number; // int
              puid: number; // int
              subName: string;
              amount: number;
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningPaymentUidRequestResult = RequestResult<
  GetSapiV1MiningPaymentUidRequest,
  GetSapiV1MiningPaymentUidResponse
>;

export function getSapiV1MiningPaymentUid(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MiningPaymentUidRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPaymentUidRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningPaymentUidEndpointSchema, payload),
    config
  );
}

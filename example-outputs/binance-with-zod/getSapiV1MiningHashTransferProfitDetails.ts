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

export const getSapiV1MiningHashTransferProfitDetailsEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/profit/details',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    configId: z.string(),
    userName: z.string(),
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
              profitTransferDetails: z.array(
                z.object({
                  poolUsername: z.string(),
                  toPoolUsername: z.string(),
                  algoName: z.string(),
                  hashRate: z.number().int().safe().finite(),
                  day: z.number().int().safe().finite(),
                  amount: z.number().safe().finite(),
                  coinName: z.string(),
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

export type GetSapiV1MiningHashTransferProfitDetailsRequest = RequestUnion<
  any,
  any,
  {
    configId: string;
    userName: string;
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningHashTransferProfitDetailsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            profitTransferDetails: {
              poolUsername: string;
              toPoolUsername: string;
              algoName: string;
              hashRate: number; // int
              day: number; // int
              amount: number;
              coinName: string;
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningHashTransferProfitDetailsRequestResult =
  RequestResult<
    GetSapiV1MiningHashTransferProfitDetailsRequest,
    GetSapiV1MiningHashTransferProfitDetailsResponse
  >;

export function getSapiV1MiningHashTransferProfitDetails(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MiningHashTransferProfitDetailsRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningHashTransferProfitDetailsRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1MiningHashTransferProfitDetailsEndpointSchema,
      payload
    ),
    config
  );
}

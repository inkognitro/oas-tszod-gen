import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1SimpleEarnFlexibleHistoryRatehistoryEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/history/rateHistory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    productId: z.string(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
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
            rows: z.array(
              z.object({
                productId: z.string(),
                asset: z.string(),
                annualPercentageRate: z.string(),
                time: z.number().int().safe().finite(),
              })
            ),
            total: z.number().int().safe().finite(),
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

export type GetSapiV1SimpleEarnFlexibleHistoryRatehistoryRequest = RequestUnion<
  any,
  any,
  {
    productId: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SimpleEarnFlexibleHistoryRatehistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            productId: string;
            asset: string;
            annualPercentageRate: string;
            time: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleHistoryRatehistoryRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnFlexibleHistoryRatehistoryRequest,
    GetSapiV1SimpleEarnFlexibleHistoryRatehistoryResponse
  >;

export function getSapiV1SimpleEarnFlexibleHistoryRatehistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexibleHistoryRatehistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleHistoryRatehistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnFlexibleHistoryRatehistoryEndpointSchema,
      payload
    ),
    config
  );
}

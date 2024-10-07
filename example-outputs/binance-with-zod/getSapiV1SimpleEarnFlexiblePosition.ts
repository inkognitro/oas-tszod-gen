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

export const getSapiV1SimpleEarnFlexiblePositionEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/position',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    productId: z.string().optional(),
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
                totalAmount: z.string(),
                tierAnnualPercentageRate: z.object({
                  '0-5BTC': z.number().safe().finite(),
                  '5-10BTC': z.number().safe().finite(),
                }),
                latestAnnualPercentageRate: z.string(),
                yesterdayAirdropPercentageRate: z.string(),
                asset: z.string(),
                airDropAsset: z.string(),
                canRedeem: z.boolean(),
                collateralAmount: z.string(),
                productId: z.string(),
                yesterdayRealTimeRewards: z.string(),
                cumulativeBonusRewards: z.string(),
                cumulativeRealTimeRewards: z.string(),
                cumulativeTotalRewards: z.string(),
                autoSubscribe: z.boolean(),
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

export type GetSapiV1SimpleEarnFlexiblePositionRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    productId?: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SimpleEarnFlexiblePositionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            totalAmount: string;
            tierAnnualPercentageRate: {
              '0-5BTC': number;
              '5-10BTC': number;
            };
            latestAnnualPercentageRate: string;
            yesterdayAirdropPercentageRate: string;
            asset: string;
            airDropAsset: string;
            canRedeem: boolean;
            collateralAmount: string;
            productId: string;
            yesterdayRealTimeRewards: string;
            cumulativeBonusRewards: string;
            cumulativeRealTimeRewards: string;
            cumulativeTotalRewards: string;
            autoSubscribe: boolean;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexiblePositionRequestResult = RequestResult<
  GetSapiV1SimpleEarnFlexiblePositionRequest,
  GetSapiV1SimpleEarnFlexiblePositionResponse
>;

export function getSapiV1SimpleEarnFlexiblePosition(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexiblePositionRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexiblePositionRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1SimpleEarnFlexiblePositionEndpointSchema, payload),
    config
  );
}

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

export const getSapiV1SimpleEarnFlexibleSubscriptionpreviewEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/subscriptionPreview',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    productId: z.string(),
    amount: z.number().safe().finite(),
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
            totalAmount: z.string(),
            rewardAsset: z.string(),
            airDropAsset: z.string(),
            estDailyBonusRewards: z.string(),
            estDailyRealTimeRewards: z.string(),
            estDailyAirdropRewards: z.string(),
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

export type GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequest =
  RequestUnion<
    any,
    any,
    {
      productId: string;
      amount: number;
      recvWindow?: number; // int
      timestamp: number; // int
      signature: string;
    }
  >;

export type GetSapiV1SimpleEarnFlexibleSubscriptionpreviewResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalAmount: string;
          rewardAsset: string;
          airDropAsset: string;
          estDailyBonusRewards: string;
          estDailyRealTimeRewards: string;
          estDailyAirdropRewards: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequest,
    GetSapiV1SimpleEarnFlexibleSubscriptionpreviewResponse
  >;

export function getSapiV1SimpleEarnFlexibleSubscriptionpreview(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleSubscriptionpreviewRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnFlexibleSubscriptionpreviewEndpointSchema,
      payload
    ),
    config
  );
}

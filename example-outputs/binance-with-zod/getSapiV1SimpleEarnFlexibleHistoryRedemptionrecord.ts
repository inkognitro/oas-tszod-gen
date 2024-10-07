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

export const getSapiV1SimpleEarnFlexibleHistoryRedemptionrecordEndpointSchema =
  {
    path: '/sapi/v1/simple-earn/flexible/history/redemptionRecord',
    method: 'get',
    supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
    queryParamsZodSchema: z.object({
      productId: z.string().optional(),
      redeemId: z.string().optional(),
      asset: z.string().optional(),
      startTime: z.number().int().safe().finite().optional(),
      endTime: z.number().int().safe().finite().optional(),
      current: z.number().int().safe().finite().optional(),
      size: z.number().int().safe().finite().optional(),
    }),
    bodyByContentType: {},
    responseByStatus: {
      '200': {
        bodyByContentType: {
          'application/json': {
            zodSchema: z.object({
              rows: z.array(
                z.object({
                  amount: z.string(),
                  asset: z.string(),
                  time: z.number().int().safe().finite(),
                  projectId: z.string(),
                  redeemId: z.number().int().safe().finite(),
                  destAccount: z.string(),
                  status: z.string(),
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

export type GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordRequest =
  RequestUnion<
    any,
    any,
    {
      productId?: string;
      redeemId?: string;
      asset?: string;
      startTime?: number; // int
      endTime?: number; // int
      current?: number; // int
      size?: number; // int
    }
  >;

export type GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            amount: string;
            asset: string;
            time: number; // int
            projectId: string;
            redeemId: number; // int
            destAccount: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordRequest,
    GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordResponse
  >;

export function getSapiV1SimpleEarnFlexibleHistoryRedemptionrecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnFlexibleHistoryRedemptionrecordEndpointSchema,
      payload
    ),
    config
  );
}

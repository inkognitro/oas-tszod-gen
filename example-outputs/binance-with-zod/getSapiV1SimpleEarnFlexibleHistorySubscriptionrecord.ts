import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnFlexibleHistorySubscriptionrecordEndpointSchema =
  {
    path: '/sapi/v1/simple-earn/flexible/history/subscriptionRecord',
    method: 'get',
    supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
    queryParamsZodSchema: z.object({
      productId: z.string().optional(),
      purchaseId: z.string().optional(),
      asset: z.string().optional(),
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
                  amount: z.string(),
                  asset: z.string(),
                  time: z.number().int().safe().finite(),
                  purchaseId: z.number().int().safe().finite(),
                  type: z.string(),
                  sourceAccount: z.string(),
                  amtFromSpot: z.string(),
                  amtFromFunding: z.string(),
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

export type GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordPayload = {
  queryParams: {
    productId?: string;
    purchaseId?: string;
    asset?: string;
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            amount: string;
            asset: string;
            time: number; // int
            purchaseId: number; // int
            type: string;
            sourceAccount: string;
            amtFromSpot: string;
            amtFromFunding: string;
            status: string;
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordRequestResult =
  RequestResult<
    Request,
    GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordResponse
  >;

export function getSapiV1SimpleEarnFlexibleHistorySubscriptionrecord(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SimpleEarnFlexibleHistorySubscriptionrecordEndpointSchema,
    }),
    config
  );
}

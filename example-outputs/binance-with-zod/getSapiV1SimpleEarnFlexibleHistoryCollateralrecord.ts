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

export const getSapiV1SimpleEarnFlexibleHistoryCollateralrecordEndpointSchema =
  {
    path: '/sapi/v1/simple-earn/flexible/history/collateralRecord',
    method: 'get',
    supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
    queryParamsZodSchema: z.object({
      productId: z.string().optional(),
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
                  productId: z.string(),
                  asset: z.string(),
                  createTime: z.number().int().safe().finite(),
                  type: z.string(),
                  productName: z.string(),
                  orderId: z.number().int().safe().finite(),
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

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequest =
  RequestUnion<
    any,
    any,
    {
      productId?: string;
      startTime?: number; // int
      endTime?: number; // int
      current?: number; // int
      size?: number; // int
      recvWindow?: number; // int
      timestamp: number; // int
      signature: string;
    }
  >;

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            amount: string;
            productId: string;
            asset: string;
            createTime: number; // int
            type: string;
            productName: string;
            orderId: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequestResult =
  RequestResult<
    GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequest,
    GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordResponse
  >;

export function getSapiV1SimpleEarnFlexibleHistoryCollateralrecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SimpleEarnFlexibleHistoryCollateralrecordRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SimpleEarnFlexibleHistoryCollateralrecordEndpointSchema,
      payload
    ),
    config
  );
}

import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginExchangeSmallLiabilityHistoryEndpointSchema = {
  path: '/sapi/v1/margin/exchange-small-liability-history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
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
            total: z.number().int().safe().finite(),
            rows: z.array(
              z.object({
                asset: z.string(),
                amount: z.string(),
                targetAsset: z.string(),
                targetAmount: z.string(),
                bizType: z.string(),
                timestamp: z.number().int().safe().finite(),
              })
            ),
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

export type GetSapiV1MarginExchangeSmallLiabilityHistoryPayload = {
  queryParams: {
    current?: number; // int
    size?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginExchangeSmallLiabilityHistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            asset: string;
            amount: string;
            targetAsset: string;
            targetAmount: string;
            bizType: string;
            timestamp: number; // int
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginExchangeSmallLiabilityHistoryRequestResult =
  RequestResult<Request, GetSapiV1MarginExchangeSmallLiabilityHistoryResponse>;

export function getSapiV1MarginExchangeSmallLiabilityHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginExchangeSmallLiabilityHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginExchangeSmallLiabilityHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1MarginExchangeSmallLiabilityHistoryEndpointSchema,
    }),
    config
  );
}

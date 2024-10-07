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

export const getSapiV1MarginIsolatedmargintierEndpointSchema = {
  path: '/sapi/v1/margin/isolatedMarginTier',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    tier: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              symbol: z.string().optional(),
              tier: z.number().int().safe().finite().optional(),
              effectiveMultiple: z.string().optional(),
              initialRiskRatio: z.string().optional(),
              liquidationRiskRatio: z.string().optional(),
              baseAssetMaxBorrowable: z.string().optional(),
              quoteAssetMaxBorrowable: z.string().optional(),
            })
          ),
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

export type GetSapiV1MarginIsolatedmargintierRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    tier?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginIsolatedmargintierResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          symbol?: string;
          tier?: number; // int
          effectiveMultiple?: string;
          initialRiskRatio?: string;
          liquidationRiskRatio?: string;
          baseAssetMaxBorrowable?: string;
          quoteAssetMaxBorrowable?: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedmargintierRequestResult = RequestResult<
  GetSapiV1MarginIsolatedmargintierRequest,
  GetSapiV1MarginIsolatedmargintierResponse
>;

export function getSapiV1MarginIsolatedmargintier(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginIsolatedmargintierRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedmargintierRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginIsolatedmargintierEndpointSchema, payload),
    config
  );
}

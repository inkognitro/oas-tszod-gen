import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginIsolatedmargintierEndpointSchema = {
  path: '/sapi/v1/margin/isolatedMarginTier',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1MarginIsolatedmargintierPayload = {
  queryParams: {
    symbol: string;
    tier?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginIsolatedmargintierResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginIsolatedmargintierRequestResult = RequestResult<
  Request,
  GetSapiV1MarginIsolatedmargintierResponse
>;

export function getSapiV1MarginIsolatedmargintier(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginIsolatedmargintierPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedmargintierRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginIsolatedmargintierEndpointSchema,
    }),
    config
  );
}

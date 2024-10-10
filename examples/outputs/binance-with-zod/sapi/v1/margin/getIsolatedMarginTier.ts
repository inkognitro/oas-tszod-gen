import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const getIsolatedMarginTierEndpointSchema = {
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

export type GetIsolatedMarginTierRequest = RequestUnion<
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

export type GetIsolatedMarginTierResponse =
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

export type GetIsolatedMarginTierRequestResult = RequestResult<
  GetIsolatedMarginTierRequest,
  GetIsolatedMarginTierResponse
>;

export function getIsolatedMarginTier(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetIsolatedMarginTierRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetIsolatedMarginTierRequestResult> {
  return requestHandler.execute(
    createRequest(getIsolatedMarginTierEndpointSchema, payload),
    config
  );
}

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

export const getSapiV1MarginIsolatedmargindataEndpointSchema = {
  path: '/sapi/v1/margin/isolatedMarginData',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    vipLevel: z.number().int().safe().finite().optional(),
    symbol: z.string().optional(),
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
              vipLevel: z.number().int().safe().finite().optional(),
              symbol: z.string().optional(),
              leverage: z.string().optional(),
              data: z
                .array(
                  z.object({
                    coin: z.string().optional(),
                    dailyInterest: z.string().optional(),
                    borrowLimit: z.string().optional(),
                  })
                )
                .optional(),
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

export type GetSapiV1MarginIsolatedmargindataPayload = {
  queryParams: {
    vipLevel?: number; // int
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginIsolatedmargindataResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          vipLevel?: number; // int
          symbol?: string;
          leverage?: string;
          data?: {
            coin?: string;
            dailyInterest?: string;
            borrowLimit?: string;
          }[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginIsolatedmargindataRequestResult = RequestResult<
  Request,
  GetSapiV1MarginIsolatedmargindataResponse
>;

export function getSapiV1MarginIsolatedmargindata(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginIsolatedmargindataPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginIsolatedmargindataRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginIsolatedmargindataEndpointSchema,
    }),
    config
  );
}

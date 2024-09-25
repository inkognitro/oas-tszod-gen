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

export const getApiV3AccountCommissionEndpointSchema = {
  path: '/api/v3/account/commission',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            symbol: z.string(),
            standardCommission: z.object({
              maker: z.string(),
              taker: z.string(),
              buyer: z.string(),
              seller: z.string(),
            }),
            taxCommission: z.object({
              maker: z.string(),
              taker: z.string(),
              buyer: z.string(),
              seller: z.string(),
            }),
            discount: z.object({
              enabledForAccount: z.boolean().optional(),
              enabledForSymbol: z.boolean().optional(),
              discountAsset: z.string().optional(),
              discount: z.string().optional(),
            }),
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

export type GetApiV3AccountCommissionPayload = {
  queryParams: {
    symbol: string;
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3AccountCommissionResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            symbol: string;
            standardCommission: {
              maker: string;
              taker: string;
              buyer: string;
              seller: string;
            };
            taxCommission: {
              maker: string;
              taker: string;
              buyer: string;
              seller: string;
            };
            discount: {
              enabledForAccount?: boolean;
              enabledForSymbol?: boolean;
              discountAsset?: string;
              discount?: string;
            };
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3AccountCommissionRequestResult = RequestResult<
  Request,
  GetApiV3AccountCommissionResponse
>;

export function getApiV3AccountCommission(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3AccountCommissionPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AccountCommissionRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getApiV3AccountCommissionEndpointSchema,
    }),
    config
  );
}

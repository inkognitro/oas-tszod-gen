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

export const getCommissionEndpointSchema = {
  path: '/api/v3/account/commission',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetCommissionRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    timestamp: number; // int
    signature: string;
  }
>;

export type GetCommissionResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetCommissionRequestResult = RequestResult<
  GetCommissionRequest,
  GetCommissionResponse
>;

export function getCommission(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetCommissionRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetCommissionRequestResult> {
  return requestHandler.execute(
    createRequest(getCommissionEndpointSchema, payload),
    config
  );
}

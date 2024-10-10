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

export const getIsolatedMarginDataEndpointSchema = {
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

export type GetIsolatedMarginDataRequest = RequestUnion<
  any,
  any,
  {
    vipLevel?: number; // int
    symbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetIsolatedMarginDataResponse =
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

export type GetIsolatedMarginDataRequestResult = RequestResult<
  GetIsolatedMarginDataRequest,
  GetIsolatedMarginDataResponse
>;

export function getIsolatedMarginData(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetIsolatedMarginDataRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetIsolatedMarginDataRequestResult> {
  return requestHandler.execute(
    createRequest(getIsolatedMarginDataEndpointSchema, payload),
    config
  );
}

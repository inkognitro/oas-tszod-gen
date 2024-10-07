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

export const getApiV3DepthEndpointSchema = {
  path: '/api/v3/depth',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    limit: z.number().int().safe().finite().lte(5000).optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            lastUpdateId: z.number().int().safe().finite(),
            bids: z.array(z.array(z.string())),
            asks: z.array(z.array(z.string())),
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
  },
};

export type GetApiV3DepthRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    limit?: number; // int
  }
>;

export type GetApiV3DepthResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          lastUpdateId: number; // int
          bids: string[][];
          asks: string[][];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetApiV3DepthRequestResult = RequestResult<
  GetApiV3DepthRequest,
  GetApiV3DepthResponse
>;

export function getApiV3Depth(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3DepthRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3DepthRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3DepthEndpointSchema, payload),
    config
  );
}

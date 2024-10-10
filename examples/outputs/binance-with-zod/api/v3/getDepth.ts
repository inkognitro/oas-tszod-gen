import {z_Error, Error} from '../../';
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
} from '../../core';

export const getDepthEndpointSchema = {
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

export type GetDepthRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    limit?: number; // int
  }
>;

export type GetDepthResponse =
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

export type GetDepthRequestResult = RequestResult<
  GetDepthRequest,
  GetDepthResponse
>;

export function getDepth(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetDepthRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetDepthRequestResult> {
  return requestHandler.execute(
    createRequest(getDepthEndpointSchema, payload),
    config
  );
}

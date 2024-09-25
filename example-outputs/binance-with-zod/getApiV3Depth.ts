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
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetApiV3DepthPayload = {
  queryParams: {
    symbol: string;
    limit?: number; // int
  };
};

export type GetApiV3DepthResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            lastUpdateId: number; // int
            bids: string[][];
            asks: string[][];
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3DepthRequestResult = RequestResult<
  Request,
  GetApiV3DepthResponse
>;

export function getApiV3Depth(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3DepthPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3DepthRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3DepthEndpointSchema}),
    config
  );
}

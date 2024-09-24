import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getApiV3KlinesEndpointSchema = {
  path: '/api/v3/klines',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    interval: z.union([
      z.literal('1s'),
      z.literal('1m'),
      z.literal('3m'),
      z.literal('5m'),
      z.literal('15m'),
      z.literal('30m'),
      z.literal('1h'),
      z.literal('2h'),
      z.literal('4h'),
      z.literal('6h'),
      z.literal('8h'),
      z.literal('12h'),
      z.literal('1d'),
      z.literal('3d'),
      z.literal('1w'),
      z.literal('1M'),
    ]),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    timeZone: z.string().optional(),
    limit: z.number().int().safe().finite().optional(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.array(z.union([z.number().int().safe().finite(), z.string()]))
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
  },
};

export type GetApiV3KlinesPayload = {
  queryParams: {
    symbol: string;
    interval:
      | '1s'
      | '1m'
      | '3m'
      | '5m'
      | '15m'
      | '30m'
      | '1h'
      | '2h'
      | '4h'
      | '6h'
      | '8h'
      | '12h'
      | '1d'
      | '3d'
      | '1w'
      | '1M';
    startTime?: number; // int
    endTime?: number; // int
    timeZone?: string;
    limit?: number; // int
  };
};

export type GetApiV3KlinesResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          (
            | number // int
            | string
          )[][]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3KlinesRequestResult = RequestResult<
  Request,
  GetApiV3KlinesResponse
>;

export function getApiV3Klines(
  requestHandler: RequestHandler,
  payload: GetApiV3KlinesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3KlinesRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3KlinesEndpointSchema}),
    config
  );
}

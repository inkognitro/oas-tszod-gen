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

export const getApiV3UiklinesEndpointSchema = {
  path: '/api/v3/uiKlines',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    interval: z.enum(
      '1s',
      '1m',
      '3m',
      '5m',
      '15m',
      '30m',
      '1h',
      '2h',
      '4h',
      '6h',
      '8h',
      '12h',
      '1d',
      '3d',
      '1w',
      '1M'
    ),
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

export type GetApiV3UiklinesPayload = {
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

export type GetApiV3UiklinesResponse =
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

export type GetApiV3UiklinesRequestResult = RequestResult<
  Request,
  GetApiV3UiklinesResponse
>;

export function getApiV3Uiklines(
  requestHandler: RequestHandler,
  payload: GetApiV3UiklinesPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3UiklinesRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3UiklinesEndpointSchema}),
    config
  );
}

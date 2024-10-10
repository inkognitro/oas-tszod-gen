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

export const getUiKlinesEndpointSchema = {
  path: '/api/v3/uiKlines',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
    interval: z.enum([
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
      '1M',
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
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetUiKlinesRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetUiKlinesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (
          | number // int
          | string
        )[][]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetUiKlinesRequestResult = RequestResult<
  GetUiKlinesRequest,
  GetUiKlinesResponse
>;

export function getUiKlines(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetUiKlinesRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetUiKlinesRequestResult> {
  return requestHandler.execute(
    createRequest(getUiKlinesEndpointSchema, payload),
    config
  );
}

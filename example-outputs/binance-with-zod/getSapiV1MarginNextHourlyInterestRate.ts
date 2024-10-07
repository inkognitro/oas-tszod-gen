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

export const getSapiV1MarginNextHourlyInterestRateEndpointSchema = {
  path: '/sapi/v1/margin/next-hourly-interest-rate',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    assets: z.string().optional(),
    isIsolated: z.enum(['TRUE', 'FALSE']).optional(),
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
              asset: z.string(),
              nextHourlyInterestRate: z.string(),
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

export type GetSapiV1MarginNextHourlyInterestRateRequest = RequestUnion<
  any,
  any,
  {
    assets?: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginNextHourlyInterestRateResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          asset: string;
          nextHourlyInterestRate: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginNextHourlyInterestRateRequestResult = RequestResult<
  GetSapiV1MarginNextHourlyInterestRateRequest,
  GetSapiV1MarginNextHourlyInterestRateResponse
>;

export function getSapiV1MarginNextHourlyInterestRate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginNextHourlyInterestRateRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginNextHourlyInterestRateRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginNextHourlyInterestRateEndpointSchema, payload),
    config
  );
}

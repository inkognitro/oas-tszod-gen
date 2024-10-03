import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const getSapiV1MarginDelistScheduleEndpointSchema = {
  path: '/sapi/v1/margin/delist-schedule',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
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
              delistTime: z.number().int().safe().finite().optional(),
              crossMarginAssets: z.array(z.string()).optional(),
              isolatedMarginSymbols: z.array(z.string()).optional(),
            })
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
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1MarginDelistScheduleRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginDelistScheduleResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          delistTime?: number; // int
          crossMarginAssets?: string[];
          isolatedMarginSymbols?: string[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginDelistScheduleRequestResult = RequestResult<
  GetSapiV1MarginDelistScheduleRequest,
  GetSapiV1MarginDelistScheduleResponse
>;

export function getSapiV1MarginDelistSchedule(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginDelistScheduleRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginDelistScheduleRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginDelistScheduleEndpointSchema, payload),
    config
  );
}

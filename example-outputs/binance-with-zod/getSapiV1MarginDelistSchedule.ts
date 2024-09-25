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

export const getSapiV1MarginDelistScheduleEndpointSchema = {
  path: '/sapi/v1/margin/delist-schedule',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1MarginDelistSchedulePayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginDelistScheduleResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            delistTime?: number; // int
            crossMarginAssets?: string[];
            isolatedMarginSymbols?: string[];
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginDelistScheduleRequestResult = RequestResult<
  Request,
  GetSapiV1MarginDelistScheduleResponse
>;

export function getSapiV1MarginDelistSchedule(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginDelistSchedulePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginDelistScheduleRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginDelistScheduleEndpointSchema,
    }),
    config
  );
}

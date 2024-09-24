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

export const getSapiV1BlvtSubscribeRecordEndpointSchema = {
  path: '/sapi/v1/blvt/subscribe/record',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    tokenName: z.string().optional(),
    id: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            id: z.number().int().safe().finite(),
            tokenName: z.string(),
            amount: z.string(),
            nav: z.string(),
            fee: z.string(),
            totalCharge: z.string(),
            timestamp: z.number().int().safe().finite(),
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
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1BlvtSubscribeRecordPayload = {
  queryParams: {
    tokenName?: string;
    id?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1BlvtSubscribeRecordResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            id: number; // int
            tokenName: string;
            amount: string;
            nav: string;
            fee: string;
            totalCharge: string;
            timestamp: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1BlvtSubscribeRecordRequestResult = RequestResult<
  Request,
  GetSapiV1BlvtSubscribeRecordResponse
>;

export function getSapiV1BlvtSubscribeRecord(
  requestHandler: RequestHandler,
  payload: GetSapiV1BlvtSubscribeRecordPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BlvtSubscribeRecordRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1BlvtSubscribeRecordEndpointSchema,
    }),
    config
  );
}

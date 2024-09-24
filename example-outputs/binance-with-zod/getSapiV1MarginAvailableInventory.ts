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

export const getSapiV1MarginAvailableInventoryEndpointSchema = {
  path: '/sapi/v1/margin/available-inventory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    type: z.union([z.literal('MARGIN'), z.literal('ISOLATED')]),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            assets: z.object({
              MATIC: z.string(),
              STPT: z.string(),
              TVK: z.string(),
              SHIB: z.string(),
            }),
            updateTime: z.number().int().safe().finite(),
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

export type GetSapiV1MarginAvailableInventoryPayload = {
  queryParams: {
    type: 'MARGIN' | 'ISOLATED';
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginAvailableInventoryResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            assets: {
              MATIC: string;
              STPT: string;
              TVK: string;
              SHIB: string;
            };
            updateTime: number; // int
          }
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MarginAvailableInventoryRequestResult = RequestResult<
  Request,
  GetSapiV1MarginAvailableInventoryResponse
>;

export function getSapiV1MarginAvailableInventory(
  requestHandler: RequestHandler,
  payload: GetSapiV1MarginAvailableInventoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAvailableInventoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginAvailableInventoryEndpointSchema,
    }),
    config
  );
}

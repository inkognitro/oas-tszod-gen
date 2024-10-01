import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginAvailableInventoryEndpointSchema = {
  path: '/sapi/v1/margin/available-inventory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    type: z.enum(['MARGIN', 'ISOLATED']),
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
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginAvailableInventoryRequestResult = RequestResult<
  Request,
  GetSapiV1MarginAvailableInventoryResponse
>;

export function getSapiV1MarginAvailableInventory(
  requestHandler: SimpleRequestHandler,
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

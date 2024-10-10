import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const getInventoryEndpointSchema = {
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

export type GetInventoryRequest = RequestUnion<
  any,
  any,
  {
    type: 'MARGIN' | 'ISOLATED';
    timestamp: number; // int
    signature: string;
  }
>;

export type GetInventoryResponse =
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

export type GetInventoryRequestResult = RequestResult<
  GetInventoryRequest,
  GetInventoryResponse
>;

export function getInventory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetInventoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetInventoryRequestResult> {
  return requestHandler.execute(
    createRequest(getInventoryEndpointSchema, payload),
    config
  );
}

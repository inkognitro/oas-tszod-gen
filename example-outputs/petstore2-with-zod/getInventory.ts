import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2-with-zod/core';

export const getInventoryEndpointSchema = {
  path: '/store/inventory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'api_key', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.record(z.number().int().safe().finite()),
        },
      },
    },
  },
};

export type GetInventoryResponse = ResponseUnion<
  200,
  ResponseBodyData<
    'application/json',
    {
      [key: string]: number; // int
    }
  >
>;

export type GetInventoryRequestResult = RequestResult<
  Request,
  GetInventoryResponse
>;

export function getInventory(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetInventoryRequestResult> {
  return requestHandler.execute(
    createRequest({endpointSchema: getInventoryEndpointSchema}),
    config
  );
}

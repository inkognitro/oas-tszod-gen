import {
  Request,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from './core';

export const getInventoryEndpointSchema = {
  path: '/store/inventory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'api_key', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetInventoryRequest = Request;

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
  GetInventoryRequest,
  GetInventoryResponse
>;

export function getInventory(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetInventoryRequestResult> {
  return requestHandler.execute(
    createRequest(getInventoryEndpointSchema),
    config
  );
}

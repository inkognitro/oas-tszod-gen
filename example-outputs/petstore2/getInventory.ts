import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const getInventoryEndpointSchema = {
  path: '/store/inventory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'api_key', requiredPermissions: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetInventoryResponse = Response<
  200,
  ResponseData<
    ResponseBodyData<
      'application/json',
      {
        [key: string]: number; // int
      }
    >
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

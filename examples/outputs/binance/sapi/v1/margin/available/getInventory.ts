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
import {Error} from '../../../../';

export const getInventoryEndpointSchema = {
  path: '/sapi/v1/margin/available-inventory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
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

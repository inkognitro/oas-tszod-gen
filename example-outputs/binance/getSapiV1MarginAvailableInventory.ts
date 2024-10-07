import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSapiV1MarginAvailableInventoryEndpointSchema = {
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

export type GetSapiV1MarginAvailableInventoryRequest = RequestUnion<
  any,
  any,
  {
    type: 'MARGIN' | 'ISOLATED';
    timestamp: number; // int
    signature: string;
  }
>;

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
  GetSapiV1MarginAvailableInventoryRequest,
  GetSapiV1MarginAvailableInventoryResponse
>;

export function getSapiV1MarginAvailableInventory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginAvailableInventoryRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAvailableInventoryRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginAvailableInventoryEndpointSchema, payload),
    config
  );
}

import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MarginAvailableInventoryEndpointSchema = {
  path: '/sapi/v1/margin/available-inventory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

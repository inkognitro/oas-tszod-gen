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
import {MarginOcoOrder, Error} from '@example-outputs/binance';

export const deleteSapiV1MarginOrderlistEndpointSchema = {
  path: '/sapi/v1/margin/orderList',
  method: 'delete',
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

export type DeleteSapiV1MarginOrderlistRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    orderListId?: number; // int
    listClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteSapiV1MarginOrderlistResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', MarginOcoOrder>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1MarginOrderlistRequestResult = RequestResult<
  DeleteSapiV1MarginOrderlistRequest,
  DeleteSapiV1MarginOrderlistResponse
>;

export function deleteSapiV1MarginOrderlist(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteSapiV1MarginOrderlistRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1MarginOrderlistRequestResult> {
  return requestHandler.execute(
    createRequest(deleteSapiV1MarginOrderlistEndpointSchema, payload),
    config
  );
}

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
import {OcoOrder, Error} from '@example-outputs/binance';

export const deleteApiV3OrderlistEndpointSchema = {
  path: '/api/v3/orderList',
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

export type DeleteApiV3OrderlistRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    orderListId?: number; // int
    listClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteApiV3OrderlistResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', OcoOrder>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteApiV3OrderlistRequestResult = RequestResult<
  DeleteApiV3OrderlistRequest,
  DeleteApiV3OrderlistResponse
>;

export function deleteApiV3Orderlist(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteApiV3OrderlistRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3OrderlistRequestResult> {
  return requestHandler.execute(
    createRequest(deleteApiV3OrderlistEndpointSchema, payload),
    config
  );
}

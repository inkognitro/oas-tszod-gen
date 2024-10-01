import {OcoOrder, Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type DeleteApiV3OrderlistPayload = {
  queryParams: {
    symbol: string;
    orderListId?: number; // int
    listClientOrderId?: string;
    newClientOrderId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteApiV3OrderlistResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', OcoOrder>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteApiV3OrderlistRequestResult = RequestResult<
  Request,
  DeleteApiV3OrderlistResponse
>;

export function deleteApiV3Orderlist(
  requestHandler: SimpleRequestHandler,
  payload: DeleteApiV3OrderlistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteApiV3OrderlistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: deleteApiV3OrderlistEndpointSchema,
    }),
    config
  );
}

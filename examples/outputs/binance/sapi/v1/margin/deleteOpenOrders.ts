import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {CanceledMarginOrderDetail, MarginOcoOrder, Error} from '../../../';

export const deleteOpenOrdersEndpointSchema = {
  path: '/sapi/v1/margin/openOrders',
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

export type DeleteOpenOrdersRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
    isIsolated?: 'TRUE' | 'FALSE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteOpenOrdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        ((CanceledMarginOrderDetail | MarginOcoOrder) &
          (Partial<CanceledMarginOrderDetail> & Partial<MarginOcoOrder>))[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteOpenOrdersRequestResult = RequestResult<
  DeleteOpenOrdersRequest,
  DeleteOpenOrdersResponse
>;

export function deleteOpenOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteOpenOrdersRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteOpenOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(deleteOpenOrdersEndpointSchema, payload),
    config
  );
}

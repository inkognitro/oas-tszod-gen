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
import {Error} from '../../../';

export const getOrderStatusEndpointSchema = {
  path: '/sapi/v1/convert/orderStatus',
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

export type GetOrderStatusRequest = RequestUnion<
  any,
  any,
  {
    orderId?: string;
    quoteId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetOrderStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          orderId: number; // int
          orderStatus: string;
          fromAsset: string;
          fromAmount: string;
          toAsset: string;
          toAmount: string;
          ratio: string;
          inverseRatio: string;
          createTime: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetOrderStatusRequestResult = RequestResult<
  GetOrderStatusRequest,
  GetOrderStatusResponse
>;

export function getOrderStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetOrderStatusRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetOrderStatusRequestResult> {
  return requestHandler.execute(
    createRequest(getOrderStatusEndpointSchema, payload),
    config
  );
}

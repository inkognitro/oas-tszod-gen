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

export const getOrdersEndpointSchema = {
  path: '/sapi/v1/loan/ongoing/orders',
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

export type GetOrdersRequest = RequestUnion<
  any,
  any,
  {
    orderId?: number; // int
    loanCoin?: string;
    collateralCoin?: string;
    current?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetOrdersResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          rows: {
            orderId: number; // int
            loanCoin: string;
            totalDebt: string;
            residualInterest: string;
            collateralCoin: string;
            collateralAmount: string;
            currentLTV: string;
            expirationTime: number; // int
          }[];
          total: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetOrdersRequestResult = RequestResult<
  GetOrdersRequest,
  GetOrdersResponse
>;

export function getOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetOrdersRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(getOrdersEndpointSchema, payload),
    config
  );
}

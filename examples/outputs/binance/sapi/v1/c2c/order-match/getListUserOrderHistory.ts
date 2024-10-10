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

export const getListUserOrderHistoryEndpointSchema = {
  path: '/sapi/v1/c2c/orderMatch/listUserOrderHistory',
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

export type GetListUserOrderHistoryRequest = RequestUnion<
  any,
  any,
  {
    tradeType: 'BUY' | 'SELL';
    startTimestamp?: number; // int
    endTimestamp?: number; // int
    page?: number; // int
    rows?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetListUserOrderHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            orderNumber: string;
            advNo: string;
            tradeType: string;
            asset: string;
            fiat: string;
            fiatSymbol: string;
            amount: string;
            totalPrice: string;
            unitPrice: string;
            orderStatus: string;
            createTime: number; // int
            commission: string;
            counterPartNickName: string;
            advertisementRole: string;
          }[];
          total: number; // int
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetListUserOrderHistoryRequestResult = RequestResult<
  GetListUserOrderHistoryRequest,
  GetListUserOrderHistoryResponse
>;

export function getListUserOrderHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetListUserOrderHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetListUserOrderHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getListUserOrderHistoryEndpointSchema, payload),
    config
  );
}

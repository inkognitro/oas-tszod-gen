import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1C2cOrdermatchListuserorderhistoryEndpointSchema = {
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

export type GetSapiV1C2cOrdermatchListuserorderhistoryPayload = {
  queryParams: {
    tradeType: 'BUY' | 'SELL';
    startTimestamp?: number; // int
    endTimestamp?: number; // int
    page?: number; // int
    rows?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1C2cOrdermatchListuserorderhistoryResponse =
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

export type GetSapiV1C2cOrdermatchListuserorderhistoryRequestResult =
  RequestResult<Request, GetSapiV1C2cOrdermatchListuserorderhistoryResponse>;

export function getSapiV1C2cOrdermatchListuserorderhistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1C2cOrdermatchListuserorderhistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1C2cOrdermatchListuserorderhistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1C2cOrdermatchListuserorderhistoryEndpointSchema,
    }),
    config
  );
}

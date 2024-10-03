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

export const getSapiV1MiningPaymentListEndpointSchema = {
  path: '/sapi/v1/mining/payment/list',
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

export type GetSapiV1MiningPaymentListRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    userName: string;
    coin?: string;
    startDate?: string;
    endDate?: string;
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningPaymentListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            accountProfits: {
              time: number; // int
              type: number; // int
              hashTransfer: number; // int
              transferAmount: number;
              dayHashRate: number; // int
              profitAmount: number;
              coinName: string;
              status: number; // int
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningPaymentListRequestResult = RequestResult<
  GetSapiV1MiningPaymentListRequest,
  GetSapiV1MiningPaymentListResponse
>;

export function getSapiV1MiningPaymentList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MiningPaymentListRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPaymentListRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningPaymentListEndpointSchema, payload),
    config
  );
}

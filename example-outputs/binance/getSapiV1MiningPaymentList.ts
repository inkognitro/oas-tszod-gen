import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetSapiV1MiningPaymentListPayload = {
  queryParams: {
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
  };
};

export type GetSapiV1MiningPaymentListResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningPaymentListRequestResult = RequestResult<
  Request,
  GetSapiV1MiningPaymentListResponse
>;

export function getSapiV1MiningPaymentList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MiningPaymentListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPaymentListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MiningPaymentListEndpointSchema,
    }),
    config
  );
}

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

export const getSapiV1MiningPaymentOtherEndpointSchema = {
  path: '/sapi/v1/mining/payment/other',
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

export type GetSapiV1MiningPaymentOtherPayload = {
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

export type GetSapiV1MiningPaymentOtherResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            otherProfits: {
              time: number; // int
              coinName: string;
              type: number; // int
              profitAmount: number;
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

export type GetSapiV1MiningPaymentOtherRequestResult = RequestResult<
  Request,
  GetSapiV1MiningPaymentOtherResponse
>;

export function getSapiV1MiningPaymentOther(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MiningPaymentOtherPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPaymentOtherRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MiningPaymentOtherEndpointSchema,
    }),
    config
  );
}

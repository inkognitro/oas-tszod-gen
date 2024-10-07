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

export type GetSapiV1MiningPaymentOtherRequest = RequestUnion<
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
  GetSapiV1MiningPaymentOtherRequest,
  GetSapiV1MiningPaymentOtherResponse
>;

export function getSapiV1MiningPaymentOther(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MiningPaymentOtherRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPaymentOtherRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningPaymentOtherEndpointSchema, payload),
    config
  );
}

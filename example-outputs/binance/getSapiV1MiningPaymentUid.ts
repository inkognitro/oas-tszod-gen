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

export const getSapiV1MiningPaymentUidEndpointSchema = {
  path: '/sapi/v1/mining/payment/uid',
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

export type GetSapiV1MiningPaymentUidRequest = RequestUnion<
  any,
  any,
  {
    algo: string;
    startDate?: string;
    endDate?: string;
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningPaymentUidResponse =
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
              coinName: string;
              type: number; // int
              puid: number; // int
              subName: string;
              amount: number;
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningPaymentUidRequestResult = RequestResult<
  GetSapiV1MiningPaymentUidRequest,
  GetSapiV1MiningPaymentUidResponse
>;

export function getSapiV1MiningPaymentUid(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MiningPaymentUidRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningPaymentUidRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MiningPaymentUidEndpointSchema, payload),
    config
  );
}

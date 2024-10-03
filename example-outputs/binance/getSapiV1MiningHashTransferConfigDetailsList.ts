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

export const getSapiV1MiningHashTransferConfigDetailsListEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config/details/list',
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

export type GetSapiV1MiningHashTransferConfigDetailsListRequest = RequestUnion<
  any,
  any,
  {
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MiningHashTransferConfigDetailsListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            configDetails: {
              configId: number; // int
              poolUsername: string;
              toPoolUsername: string;
              algoName: string;
              hashRate: number; // int
              startDay: number; // int
              endDay: number; // int
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

export type GetSapiV1MiningHashTransferConfigDetailsListRequestResult =
  RequestResult<
    GetSapiV1MiningHashTransferConfigDetailsListRequest,
    GetSapiV1MiningHashTransferConfigDetailsListResponse
  >;

export function getSapiV1MiningHashTransferConfigDetailsList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MiningHashTransferConfigDetailsListRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningHashTransferConfigDetailsListRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1MiningHashTransferConfigDetailsListEndpointSchema,
      payload
    ),
    config
  );
}

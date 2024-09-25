import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1MiningHashTransferConfigDetailsListEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config/details/list',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1MiningHashTransferConfigDetailsListPayload = {
  queryParams: {
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MiningHashTransferConfigDetailsListResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1MiningHashTransferConfigDetailsListRequestResult =
  RequestResult<Request, GetSapiV1MiningHashTransferConfigDetailsListResponse>;

export function getSapiV1MiningHashTransferConfigDetailsList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MiningHashTransferConfigDetailsListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningHashTransferConfigDetailsListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1MiningHashTransferConfigDetailsListEndpointSchema,
    }),
    config
  );
}

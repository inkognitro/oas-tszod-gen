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

export const getSapiV1MiningHashTransferProfitDetailsEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/profit/details',
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

export type GetSapiV1MiningHashTransferProfitDetailsPayload = {
  queryParams: {
    configId: string;
    userName: string;
    pageIndex?: number; // int
    pageSize?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MiningHashTransferProfitDetailsResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: {
            profitTransferDetails: {
              poolUsername: string;
              toPoolUsername: string;
              algoName: string;
              hashRate: number; // int
              day: number; // int
              amount: number;
              coinName: string;
            }[];
            totalNum: number; // int
            pageSize: number; // int
          };
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MiningHashTransferProfitDetailsRequestResult =
  RequestResult<Request, GetSapiV1MiningHashTransferProfitDetailsResponse>;

export function getSapiV1MiningHashTransferProfitDetails(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MiningHashTransferProfitDetailsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MiningHashTransferProfitDetailsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MiningHashTransferProfitDetailsEndpointSchema,
    }),
    config
  );
}

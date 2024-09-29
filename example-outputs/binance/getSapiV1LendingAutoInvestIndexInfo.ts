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

export const getSapiV1LendingAutoInvestIndexInfoEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/index/info',
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

export type GetSapiV1LendingAutoInvestIndexInfoPayload = {
  queryParams: {
    indexId: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestIndexInfoResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          indexId: number; // int
          indexName: string;
          status: string;
          assetAllocation: {
            targetAsset: string;
            allocation: string;
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestIndexInfoRequestResult = RequestResult<
  Request,
  GetSapiV1LendingAutoInvestIndexInfoResponse
>;

export function getSapiV1LendingAutoInvestIndexInfo(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestIndexInfoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestIndexInfoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestIndexInfoEndpointSchema,
    }),
    config
  );
}

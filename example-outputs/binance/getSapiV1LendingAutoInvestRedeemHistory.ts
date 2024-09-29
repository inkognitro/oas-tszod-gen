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

export const getSapiV1LendingAutoInvestRedeemHistoryEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/redeem/history',
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

export type GetSapiV1LendingAutoInvestRedeemHistoryPayload = {
  queryParams: {
    requestId: number; // int
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    asset?: string;
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestRedeemHistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          indexId: number; // int
          indexName: string;
          redemptionId: number; // int
          status: string;
          asset: string;
          amount: string;
          redemptionDateTime: number; // int
          transactionFee: string;
          transactionFeeUnit: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestRedeemHistoryRequestResult =
  RequestResult<Request, GetSapiV1LendingAutoInvestRedeemHistoryResponse>;

export function getSapiV1LendingAutoInvestRedeemHistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestRedeemHistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestRedeemHistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestRedeemHistoryEndpointSchema,
    }),
    config
  );
}

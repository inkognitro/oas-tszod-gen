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

export const getSapiV1LendingAutoInvestRedeemHistoryEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/redeem/history',
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

export type GetSapiV1LendingAutoInvestRedeemHistoryRequest = RequestUnion<
  any,
  any,
  {
    requestId: number; // int
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    asset?: string;
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1LendingAutoInvestRedeemHistoryResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestRedeemHistoryRequestResult =
  RequestResult<
    GetSapiV1LendingAutoInvestRedeemHistoryRequest,
    GetSapiV1LendingAutoInvestRedeemHistoryResponse
  >;

export function getSapiV1LendingAutoInvestRedeemHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1LendingAutoInvestRedeemHistoryRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestRedeemHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1LendingAutoInvestRedeemHistoryEndpointSchema,
      payload
    ),
    config
  );
}

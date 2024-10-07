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

export const getSapiV1ManagedSubaccountQueryTransLogEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/query-trans-log',
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

export type GetSapiV1ManagedSubaccountQueryTransLogRequest = RequestUnion<
  any,
  any,
  {
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    transfers: 'FROM' | 'TO';
    transferFunctionAccountType:
      | 'SPOT'
      | 'MARGIN'
      | 'ISOLATED_MARGIN'
      | 'USDT_FUTURE'
      | 'COIN_FUTURE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1ManagedSubaccountQueryTransLogResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          count: number; // int
          managerSubTransferHistoryVos: {
            fromEmail: string;
            fromAccountType: string;
            toEmail: string;
            toAccountType: string;
            asset: string;
            amount: string;
            scheduledData: number; // int
            createTime: number; // int
            status: string;
            tranId: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ManagedSubaccountQueryTransLogRequestResult =
  RequestResult<
    GetSapiV1ManagedSubaccountQueryTransLogRequest,
    GetSapiV1ManagedSubaccountQueryTransLogResponse
  >;

export function getSapiV1ManagedSubaccountQueryTransLog(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1ManagedSubaccountQueryTransLogRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountQueryTransLogRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1ManagedSubaccountQueryTransLogEndpointSchema,
      payload
    ),
    config
  );
}

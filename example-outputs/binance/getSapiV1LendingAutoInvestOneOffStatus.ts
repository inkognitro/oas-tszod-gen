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

export const getSapiV1LendingAutoInvestOneOffStatusEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/one-off/status',
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

export type GetSapiV1LendingAutoInvestOneOffStatusPayload = {
  queryParams: {
    transactionId: number; // int
    requestId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1LendingAutoInvestOneOffStatusResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          transactionId: number; // int
          status: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1LendingAutoInvestOneOffStatusRequestResult = RequestResult<
  Request,
  GetSapiV1LendingAutoInvestOneOffStatusResponse
>;

export function getSapiV1LendingAutoInvestOneOffStatus(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1LendingAutoInvestOneOffStatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1LendingAutoInvestOneOffStatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1LendingAutoInvestOneOffStatusEndpointSchema,
    }),
    config
  );
}

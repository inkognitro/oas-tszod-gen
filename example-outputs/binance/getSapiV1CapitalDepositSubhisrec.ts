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

export const getSapiV1CapitalDepositSubhisrecEndpointSchema = {
  path: '/sapi/v1/capital/deposit/subHisrec',
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

export type GetSapiV1CapitalDepositSubhisrecPayload = {
  queryParams: {
    email: string;
    coin?: string;
    status?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    offset?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1CapitalDepositSubhisrecResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          amount: string;
          coin: string;
          network: string;
          status: number; // int
          address: string;
          addressTag: string;
          txId: string;
          insertTime: number; // int
          transferType: number; // int
          confirmTimes: string;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalDepositSubhisrecRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalDepositSubhisrecResponse
>;

export function getSapiV1CapitalDepositSubhisrec(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1CapitalDepositSubhisrecPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositSubhisrecRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalDepositSubhisrecEndpointSchema,
    }),
    config
  );
}

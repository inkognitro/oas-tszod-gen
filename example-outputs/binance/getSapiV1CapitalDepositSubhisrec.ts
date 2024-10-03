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

export type GetSapiV1CapitalDepositSubhisrecRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetSapiV1CapitalDepositSubhisrecResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalDepositSubhisrecRequestResult = RequestResult<
  GetSapiV1CapitalDepositSubhisrecRequest,
  GetSapiV1CapitalDepositSubhisrecResponse
>;

export function getSapiV1CapitalDepositSubhisrec(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1CapitalDepositSubhisrecRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositSubhisrecRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1CapitalDepositSubhisrecEndpointSchema, payload),
    config
  );
}

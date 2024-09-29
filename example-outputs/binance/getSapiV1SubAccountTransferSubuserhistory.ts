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

export const getSapiV1SubAccountTransferSubuserhistoryEndpointSchema = {
  path: '/sapi/v1/sub-account/transfer/subUserHistory',
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

export type GetSapiV1SubAccountTransferSubuserhistoryPayload = {
  queryParams: {
    asset?: string;
    type?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountTransferSubuserhistoryResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          counterParty: string;
          email: string;
          type: number; // int
          asset: string;
          qty: string;
          fromAccountType: string;
          toAccountType: string;
          status: string;
          tranId: number; // int
          time: number; // int
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountTransferSubuserhistoryRequestResult =
  RequestResult<Request, GetSapiV1SubAccountTransferSubuserhistoryResponse>;

export function getSapiV1SubAccountTransferSubuserhistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountTransferSubuserhistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountTransferSubuserhistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountTransferSubuserhistoryEndpointSchema,
    }),
    config
  );
}

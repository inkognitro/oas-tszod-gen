import {Account, Error} from '@example-outputs/binance';
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

export const getApiV3AccountEndpointSchema = {
  path: '/api/v3/account',
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

export type GetApiV3AccountPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3AccountResponse =
  | Response<200, ResponseData<ResponseBodyData<'application/json', Account>>>
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetApiV3AccountRequestResult = RequestResult<
  Request,
  GetApiV3AccountResponse
>;

export function getApiV3Account(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3AccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AccountRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3AccountEndpointSchema}),
    config
  );
}

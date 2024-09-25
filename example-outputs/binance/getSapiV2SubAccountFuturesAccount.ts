import {
  SubAccountUSDTFuturesDetails,
  SubAccountCOINFuturesDetails,
  Error,
} from '@example-outputs/binance';
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

export const getSapiV2SubAccountFuturesAccountEndpointSchema = {
  path: '/sapi/v2/sub-account/futures/account',
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

export type GetSapiV2SubAccountFuturesAccountPayload = {
  queryParams: {
    email: string;
    futuresType: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV2SubAccountFuturesAccountResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          SubAccountUSDTFuturesDetails | SubAccountCOINFuturesDetails
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV2SubAccountFuturesAccountRequestResult = RequestResult<
  Request,
  GetSapiV2SubAccountFuturesAccountResponse
>;

export function getSapiV2SubAccountFuturesAccount(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV2SubAccountFuturesAccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV2SubAccountFuturesAccountRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV2SubAccountFuturesAccountEndpointSchema,
    }),
    config
  );
}

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

export const getSapiV1DciProductAccountsEndpointSchema = {
  path: '/sapi/v1/dci/product/accounts',
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

export type GetSapiV1DciProductAccountsPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1DciProductAccountsResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalAmountInBTC: string;
          totalAmountInUSDT: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1DciProductAccountsRequestResult = RequestResult<
  Request,
  GetSapiV1DciProductAccountsResponse
>;

export function getSapiV1DciProductAccounts(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1DciProductAccountsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1DciProductAccountsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1DciProductAccountsEndpointSchema,
    }),
    config
  );
}

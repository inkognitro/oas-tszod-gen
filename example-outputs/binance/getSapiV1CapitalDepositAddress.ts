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

export const getSapiV1CapitalDepositAddressEndpointSchema = {
  path: '/sapi/v1/capital/deposit/address',
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

export type GetSapiV1CapitalDepositAddressPayload = {
  queryParams: {
    coin: string;
    network?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1CapitalDepositAddressResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          address: string;
          coin: string;
          tag: string;
          url: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalDepositAddressRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalDepositAddressResponse
>;

export function getSapiV1CapitalDepositAddress(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1CapitalDepositAddressPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositAddressRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalDepositAddressEndpointSchema,
    }),
    config
  );
}

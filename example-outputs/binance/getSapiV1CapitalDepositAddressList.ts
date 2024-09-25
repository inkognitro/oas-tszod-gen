import {Error} from '@example-outputs/binance';
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

export const getSapiV1CapitalDepositAddressListEndpointSchema = {
  path: '/sapi/v1/capital/deposit/address/list',
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

export type GetSapiV1CapitalDepositAddressListPayload = {
  queryParams: {
    coin: string;
    network?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1CapitalDepositAddressListResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            coin: string;
            address: string;
            isDefault: number; // int
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1CapitalDepositAddressListRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalDepositAddressListResponse
>;

export function getSapiV1CapitalDepositAddressList(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1CapitalDepositAddressListPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositAddressListRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalDepositAddressListEndpointSchema,
    }),
    config
  );
}

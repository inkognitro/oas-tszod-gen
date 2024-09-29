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

export const getSapiV1CapitalWithdrawAddressListEndpointSchema = {
  path: '/sapi/v1/capital/withdraw/address/list',
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

export type GetSapiV1CapitalWithdrawAddressListResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          address: string;
          addressTag: string;
          coin: string;
          name: string;
          network: string;
          origin: string;
          originType: string;
          whiteStatus: boolean;
        }[]
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalWithdrawAddressListRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalWithdrawAddressListResponse
>;

export function getSapiV1CapitalWithdrawAddressList(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalWithdrawAddressListRequestResult> {
  return requestHandler.execute(
    createRequest({
      endpointSchema: getSapiV1CapitalWithdrawAddressListEndpointSchema,
    }),
    config
  );
}

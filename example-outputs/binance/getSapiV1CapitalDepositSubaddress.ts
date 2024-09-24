import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1CapitalDepositSubaddressEndpointSchema = {
  path: '/sapi/v1/capital/deposit/subAddress',
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

export type GetSapiV1CapitalDepositSubaddressPayload = {
  queryParams: {
    email: string;
    coin: string;
    network?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1CapitalDepositSubaddressResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1CapitalDepositSubaddressRequestResult = RequestResult<
  Request,
  GetSapiV1CapitalDepositSubaddressResponse
>;

export function getSapiV1CapitalDepositSubaddress(
  requestHandler: RequestHandler,
  payload: GetSapiV1CapitalDepositSubaddressPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositSubaddressRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1CapitalDepositSubaddressEndpointSchema,
    }),
    config
  );
}

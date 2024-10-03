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

export const getSapiV1CapitalDepositSubaddressEndpointSchema = {
  path: '/sapi/v1/capital/deposit/subAddress',
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

export type GetSapiV1CapitalDepositSubaddressRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    coin: string;
    network?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1CapitalDepositSubaddressResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalDepositSubaddressRequestResult = RequestResult<
  GetSapiV1CapitalDepositSubaddressRequest,
  GetSapiV1CapitalDepositSubaddressResponse
>;

export function getSapiV1CapitalDepositSubaddress(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1CapitalDepositSubaddressRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalDepositSubaddressRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1CapitalDepositSubaddressEndpointSchema, payload),
    config
  );
}

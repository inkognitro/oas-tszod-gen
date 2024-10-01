import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1CapitalContractConvertibleCoinsEndpointSchema = {
  path: '/sapi/v1/capital/contract/convertible-coins',
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

export type GetSapiV1CapitalContractConvertibleCoinsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          convertEnabled: boolean;
          coins: string[];
          exchangeRates: {
            USDC: string;
            TUSD: string;
            USDP: string;
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1CapitalContractConvertibleCoinsRequestResult =
  RequestResult<Request, GetSapiV1CapitalContractConvertibleCoinsResponse>;

export function getSapiV1CapitalContractConvertibleCoins(
  requestHandler: SimpleRequestHandler,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1CapitalContractConvertibleCoinsRequestResult> {
  return requestHandler.execute(
    createRequest({
      endpointSchema: getSapiV1CapitalContractConvertibleCoinsEndpointSchema,
    }),
    config
  );
}

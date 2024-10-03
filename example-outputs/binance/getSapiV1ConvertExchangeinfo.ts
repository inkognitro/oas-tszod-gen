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

export const getSapiV1ConvertExchangeinfoEndpointSchema = {
  path: '/sapi/v1/convert/exchangeInfo',
  method: 'get',
  supportedSecuritySchemas: [],
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

export type GetSapiV1ConvertExchangeinfoRequest = RequestUnion<
  any,
  any,
  {
    fromAsset?: string;
    toAsset?: string;
  }
>;

export type GetSapiV1ConvertExchangeinfoResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          fromAsset: string;
          toAsset: string;
          fromAssetMinAmount: string;
          fromAssetMaxAmount: string;
          toAssetMinAmount: string;
          toAssetMaxAmount: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1ConvertExchangeinfoRequestResult = RequestResult<
  GetSapiV1ConvertExchangeinfoRequest,
  GetSapiV1ConvertExchangeinfoResponse
>;

export function getSapiV1ConvertExchangeinfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1ConvertExchangeinfoRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ConvertExchangeinfoRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1ConvertExchangeinfoEndpointSchema, payload),
    config
  );
}

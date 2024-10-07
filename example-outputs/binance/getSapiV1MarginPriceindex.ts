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

export const getSapiV1MarginPriceindexEndpointSchema = {
  path: '/sapi/v1/margin/priceIndex',
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
  },
};

export type GetSapiV1MarginPriceindexRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
  }
>;

export type GetSapiV1MarginPriceindexResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          calcTime: number; // int
          price: string;
          symbol: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginPriceindexRequestResult = RequestResult<
  GetSapiV1MarginPriceindexRequest,
  GetSapiV1MarginPriceindexResponse
>;

export function getSapiV1MarginPriceindex(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginPriceindexRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginPriceindexRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginPriceindexEndpointSchema, payload),
    config
  );
}

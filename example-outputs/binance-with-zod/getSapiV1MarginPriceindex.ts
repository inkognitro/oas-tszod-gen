import {z_Error, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginPriceindexEndpointSchema = {
  path: '/sapi/v1/margin/priceIndex',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    symbol: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            calcTime: z.number().int().safe().finite(),
            price: z.string(),
            symbol: z.string(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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
  payload: RequestPayload<GetSapiV1MarginPriceindexRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginPriceindexRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginPriceindexEndpointSchema, payload),
    config
  );
}

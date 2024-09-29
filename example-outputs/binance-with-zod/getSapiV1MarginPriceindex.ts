import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginPriceindexEndpointSchema = {
  path: '/sapi/v1/margin/priceIndex',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1MarginPriceindexPayload = {
  queryParams: {
    symbol: string;
  };
};

export type GetSapiV1MarginPriceindexResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginPriceindexRequestResult = RequestResult<
  Request,
  GetSapiV1MarginPriceindexResponse
>;

export function getSapiV1MarginPriceindex(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginPriceindexPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginPriceindexRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginPriceindexEndpointSchema,
    }),
    config
  );
}

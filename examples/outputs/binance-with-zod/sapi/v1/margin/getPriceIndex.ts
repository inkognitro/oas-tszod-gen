import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const getPriceIndexEndpointSchema = {
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

export type GetPriceIndexRequest = RequestUnion<
  any,
  any,
  {
    symbol: string;
  }
>;

export type GetPriceIndexResponse =
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

export type GetPriceIndexRequestResult = RequestResult<
  GetPriceIndexRequest,
  GetPriceIndexResponse
>;

export function getPriceIndex(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetPriceIndexRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetPriceIndexRequestResult> {
  return requestHandler.execute(
    createRequest(getPriceIndexEndpointSchema, payload),
    config
  );
}

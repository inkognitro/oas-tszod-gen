import {
  z_Product,
  z_Error,
  Product,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/stripe-with-zod/core';

export const getProductsSearchEndpointSchema = {
  path: '/v1/products/search',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    page: z.string().optional(),
    query: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            data: z.array(z_Product),
            has_more: z.boolean(),
            next_page: z.string().nullable().optional(),
            object: z.enum(['search_result']),
            total_count: z.number().int().safe().finite().optional(),
            url: z.string(),
          }),
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type GetProductsSearchRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    expand?: string[];
    limit?: number; // int
    page?: string;
    query: string;
  }
>;

export type GetProductsSearchResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Product[];
          has_more: boolean;
          next_page?: string | null;
          object: 'search_result';
          total_count?: number; // int
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetProductsSearchRequestResult = RequestResult<
  GetProductsSearchRequest,
  GetProductsSearchResponse
>;

export function getProductsSearch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetProductsSearchRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetProductsSearchRequestResult> {
  return requestHandler.execute(
    createRequest(getProductsSearchEndpointSchema, payload),
    config
  );
}

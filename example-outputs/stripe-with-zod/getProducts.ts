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

export const getProductsEndpointSchema = {
  path: '/v1/products',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    active: z.boolean().optional(),
    created: z
      .union([
        z.object({
          gt: z.number().int().safe().finite().optional(),
          gte: z.number().int().safe().finite().optional(),
          lt: z.number().int().safe().finite().optional(),
          lte: z.number().int().safe().finite().optional(),
        }),
        z.number().int().safe().finite(),
      ])
      .optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    ids: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    shippable: z.boolean().optional(),
    starting_after: z.string().optional(),
    url: z.string().optional(),
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
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/products/),
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

export type GetProductsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    active?: boolean;
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    ids?: string[];
    limit?: number; // int
    shippable?: boolean;
    starting_after?: string;
    url?: string;
  }
>;

export type GetProductsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Product[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetProductsRequestResult = RequestResult<
  GetProductsRequest,
  GetProductsResponse
>;

export function getProducts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetProductsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetProductsRequestResult> {
  return requestHandler.execute(
    createRequest(getProductsEndpointSchema, payload),
    config
  );
}

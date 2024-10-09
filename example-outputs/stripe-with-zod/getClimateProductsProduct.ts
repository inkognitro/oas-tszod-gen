import {
  z_Climate_Product,
  z_Error,
  Climate_Product,
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

export const getClimateProductsProductEndpointSchema = {
  path: '/v1/climate/products/{product}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    product: z.string(),
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
          zodSchema: z_Climate_Product,
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

export type GetClimateProductsProductRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    product: string;
  },
  {
    expand?: string[];
  }
>;

export type GetClimateProductsProductResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Product>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetClimateProductsProductRequestResult = RequestResult<
  GetClimateProductsProductRequest,
  GetClimateProductsProductResponse
>;

export function getClimateProductsProduct(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetClimateProductsProductRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetClimateProductsProductRequestResult> {
  return requestHandler.execute(
    createRequest(getClimateProductsProductEndpointSchema, payload),
    config
  );
}

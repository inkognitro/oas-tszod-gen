import {z_Product_feature, z_Error, Product_feature, Error} from './schemas';
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
} from './core';

export const getProductsProductFeaturesIdEndpointSchema = {
  path: '/v1/products/{product}/features/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Product_feature,
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

export type GetProductsProductFeaturesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
    product: string;
  },
  {
    expand?: string[];
  }
>;

export type GetProductsProductFeaturesIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Product_feature>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetProductsProductFeaturesIdRequestResult = RequestResult<
  GetProductsProductFeaturesIdRequest,
  GetProductsProductFeaturesIdResponse
>;

export function getProductsProductFeaturesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetProductsProductFeaturesIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetProductsProductFeaturesIdRequestResult> {
  return requestHandler.execute(
    createRequest(getProductsProductFeaturesIdEndpointSchema, payload),
    config
  );
}

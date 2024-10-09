import {
  z_Deleted_product_feature,
  z_Error,
  Deleted_product_feature,
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

export const deleteProductsProductFeaturesIdEndpointSchema = {
  path: '/v1/products/{product}/features/{id}',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_product_feature,
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

export type DeleteProductsProductFeaturesIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
    product: string;
  }
>;

export type DeleteProductsProductFeaturesIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_product_feature>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteProductsProductFeaturesIdRequestResult = RequestResult<
  DeleteProductsProductFeaturesIdRequest,
  DeleteProductsProductFeaturesIdResponse
>;

export function deleteProductsProductFeaturesId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteProductsProductFeaturesIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteProductsProductFeaturesIdRequestResult> {
  return requestHandler.execute(
    createRequest(deleteProductsProductFeaturesIdEndpointSchema, payload),
    config
  );
}

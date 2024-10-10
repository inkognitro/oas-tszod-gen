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
import {Deleted_product_feature, Error} from './schemas';

export const deleteProductsProductFeaturesIdEndpointSchema = {
  path: '/v1/products/{product}/features/{id}',
  method: 'delete',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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

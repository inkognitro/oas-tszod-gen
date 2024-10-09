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
} from '@example-outputs/stripe/core';
import {Product_feature, Error} from '@example-outputs/stripe';

export const getProductsProductFeaturesIdEndpointSchema = {
  path: '/v1/products/{product}/features/{id}',
  method: 'get',
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

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

export const postProductsProductFeaturesEndpointSchema = {
  path: '/v1/products/{product}/features',
  method: 'post',
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

export type PostProductsProductFeaturesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      entitlement_feature: string;
      expand?: string[];
    }
  >,
  {
    product: string;
  }
>;

export type PostProductsProductFeaturesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Product_feature>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostProductsProductFeaturesRequestResult = RequestResult<
  PostProductsProductFeaturesRequest,
  PostProductsProductFeaturesResponse
>;

export function postProductsProductFeatures(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostProductsProductFeaturesRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostProductsProductFeaturesRequestResult> {
  return requestHandler.execute(
    createRequest(postProductsProductFeaturesEndpointSchema, payload),
    config
  );
}

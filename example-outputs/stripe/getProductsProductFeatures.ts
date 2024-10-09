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

export const getProductsProductFeaturesEndpointSchema = {
  path: '/v1/products/{product}/features',
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

export type GetProductsProductFeaturesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    product: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetProductsProductFeaturesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Product_feature[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetProductsProductFeaturesRequestResult = RequestResult<
  GetProductsProductFeaturesRequest,
  GetProductsProductFeaturesResponse
>;

export function getProductsProductFeatures(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetProductsProductFeaturesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetProductsProductFeaturesRequestResult> {
  return requestHandler.execute(
    createRequest(getProductsProductFeaturesEndpointSchema, payload),
    config
  );
}

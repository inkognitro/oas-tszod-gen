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
import {Climate_Product, Error} from '@example-outputs/stripe';

export const getClimateProductsProductEndpointSchema = {
  path: '/v1/climate/products/{product}',
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

import {
  z_Product_feature,
  z_Error,
  Product_feature,
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

export const postProductsProductFeaturesEndpointSchema = {
  path: '/v1/products/{product}/features',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    product: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        entitlement_feature: z.string(),
        expand: z.array(z.string()).optional(),
      }),
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

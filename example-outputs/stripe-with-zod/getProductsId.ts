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

export const getProductsIdEndpointSchema = {
  path: '/v1/products/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Product,
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

export type GetProductsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetProductsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Product>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetProductsIdRequestResult = RequestResult<
  GetProductsIdRequest,
  GetProductsIdResponse
>;

export function getProductsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetProductsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetProductsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getProductsIdEndpointSchema, payload),
    config
  );
}

import {z_Deleted_product, z_Error, Deleted_product, Error} from './schemas';
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

export const deleteProductsIdEndpointSchema = {
  path: '/v1/products/{id}',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_product,
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

export type DeleteProductsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  }
>;

export type DeleteProductsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_product>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteProductsIdRequestResult = RequestResult<
  DeleteProductsIdRequest,
  DeleteProductsIdResponse
>;

export function deleteProductsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteProductsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteProductsIdRequestResult> {
  return requestHandler.execute(
    createRequest(deleteProductsIdEndpointSchema, payload),
    config
  );
}

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
import {Deleted_product, Error} from './schemas';

export const deleteProductsIdEndpointSchema = {
  path: '/v1/products/{id}',
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

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
import {Deleted_tax_id, Error} from './schemas';

export const deleteTaxIdsIdEndpointSchema = {
  path: '/v1/tax_ids/{id}',
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

export type DeleteTaxIdsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  }
>;

export type DeleteTaxIdsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_tax_id>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteTaxIdsIdRequestResult = RequestResult<
  DeleteTaxIdsIdRequest,
  DeleteTaxIdsIdResponse
>;

export function deleteTaxIdsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteTaxIdsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteTaxIdsIdRequestResult> {
  return requestHandler.execute(
    createRequest(deleteTaxIdsIdEndpointSchema, payload),
    config
  );
}

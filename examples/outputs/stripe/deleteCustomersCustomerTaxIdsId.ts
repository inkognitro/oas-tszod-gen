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

export const deleteCustomersCustomerTaxIdsIdEndpointSchema = {
  path: '/v1/customers/{customer}/tax_ids/{id}',
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

export type DeleteCustomersCustomerTaxIdsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
    id: string;
  }
>;

export type DeleteCustomersCustomerTaxIdsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_tax_id>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteCustomersCustomerTaxIdsIdRequestResult = RequestResult<
  DeleteCustomersCustomerTaxIdsIdRequest,
  DeleteCustomersCustomerTaxIdsIdResponse
>;

export function deleteCustomersCustomerTaxIdsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteCustomersCustomerTaxIdsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteCustomersCustomerTaxIdsIdRequestResult> {
  return requestHandler.execute(
    createRequest(deleteCustomersCustomerTaxIdsIdEndpointSchema, payload),
    config
  );
}

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
import {Deleted_customer, Error} from './schemas';

export const deleteCustomersCustomerEndpointSchema = {
  path: '/v1/customers/{customer}',
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

export type DeleteCustomersCustomerRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  }
>;

export type DeleteCustomersCustomerResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_customer>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteCustomersCustomerRequestResult = RequestResult<
  DeleteCustomersCustomerRequest,
  DeleteCustomersCustomerResponse
>;

export function deleteCustomersCustomer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteCustomersCustomerRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteCustomersCustomerRequestResult> {
  return requestHandler.execute(
    createRequest(deleteCustomersCustomerEndpointSchema, payload),
    config
  );
}

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
import {Deleted_discount, Error} from './schemas';

export const deleteCustomersCustomerDiscountEndpointSchema = {
  path: '/v1/customers/{customer}/discount',
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

export type DeleteCustomersCustomerDiscountRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  }
>;

export type DeleteCustomersCustomerDiscountResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Deleted_discount>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteCustomersCustomerDiscountRequestResult = RequestResult<
  DeleteCustomersCustomerDiscountRequest,
  DeleteCustomersCustomerDiscountResponse
>;

export function deleteCustomersCustomerDiscount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteCustomersCustomerDiscountRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteCustomersCustomerDiscountRequestResult> {
  return requestHandler.execute(
    createRequest(deleteCustomersCustomerDiscountEndpointSchema, payload),
    config
  );
}

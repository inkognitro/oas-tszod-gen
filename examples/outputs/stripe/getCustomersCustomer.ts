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
import {Customer, Deleted_customer, Error} from './schemas';

export const getCustomersCustomerEndpointSchema = {
  path: '/v1/customers/{customer}',
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

export type GetCustomersCustomerRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCustomersCustomerResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        (Customer | Deleted_customer) &
          (Partial<Customer> & Partial<Deleted_customer>)
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerRequestResult = RequestResult<
  GetCustomersCustomerRequest,
  GetCustomersCustomerResponse
>;

export function getCustomersCustomer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerEndpointSchema, payload),
    config
  );
}

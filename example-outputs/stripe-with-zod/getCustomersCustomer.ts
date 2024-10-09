import {
  z_Customer,
  z_Deleted_customer,
  z_Error,
  Customer,
  Deleted_customer,
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

export const getCustomersCustomerEndpointSchema = {
  path: '/v1/customers/{customer}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    customer: z.string(),
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
          zodSchema: z.union([z_Customer, z_Deleted_customer]),
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

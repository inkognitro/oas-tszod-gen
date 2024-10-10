import {z_Deleted_discount, z_Error, Deleted_discount, Error} from './schemas';
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

export const deleteCustomersCustomerDiscountEndpointSchema = {
  path: '/v1/customers/{customer}/discount',
  method: 'delete',
  supportedSecuritySchemas: [],
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
          zodSchema: z_Deleted_discount,
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

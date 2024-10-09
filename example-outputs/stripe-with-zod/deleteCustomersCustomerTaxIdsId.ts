import {
  z_Deleted_tax_id,
  z_Error,
  Deleted_tax_id,
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

export const deleteCustomersCustomerTaxIdsIdEndpointSchema = {
  path: '/v1/customers/{customer}/tax_ids/{id}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
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
          zodSchema: z_Deleted_tax_id,
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

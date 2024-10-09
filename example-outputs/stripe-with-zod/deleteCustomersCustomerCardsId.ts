import {
  z_Payment_source,
  z_Deleted_payment_source,
  z_Error,
  Payment_source,
  Deleted_payment_source,
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

export const deleteCustomersCustomerCardsIdEndpointSchema = {
  path: '/v1/customers/{customer}/cards/{id}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([z_Payment_source, z_Deleted_payment_source]),
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

export type DeleteCustomersCustomerCardsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    customer: string;
    id: string;
  }
>;

export type DeleteCustomersCustomerCardsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        Payment_source | Deleted_payment_source
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteCustomersCustomerCardsIdRequestResult = RequestResult<
  DeleteCustomersCustomerCardsIdRequest,
  DeleteCustomersCustomerCardsIdResponse
>;

export function deleteCustomersCustomerCardsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteCustomersCustomerCardsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteCustomersCustomerCardsIdRequestResult> {
  return requestHandler.execute(
    createRequest(deleteCustomersCustomerCardsIdEndpointSchema, payload),
    config
  );
}

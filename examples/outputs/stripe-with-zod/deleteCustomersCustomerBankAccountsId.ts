import {
  z_Payment_source,
  z_Deleted_payment_source,
  z_Error,
  Payment_source,
  Deleted_payment_source,
  Error,
} from './schemas';
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

export const deleteCustomersCustomerBankAccountsIdEndpointSchema = {
  path: '/v1/customers/{customer}/bank_accounts/{id}',
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

export type DeleteCustomersCustomerBankAccountsIdRequest = RequestUnion<
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

export type DeleteCustomersCustomerBankAccountsIdResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        Payment_source | Deleted_payment_source
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteCustomersCustomerBankAccountsIdRequestResult = RequestResult<
  DeleteCustomersCustomerBankAccountsIdRequest,
  DeleteCustomersCustomerBankAccountsIdResponse
>;

export function deleteCustomersCustomerBankAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteCustomersCustomerBankAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteCustomersCustomerBankAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(deleteCustomersCustomerBankAccountsIdEndpointSchema, payload),
    config
  );
}

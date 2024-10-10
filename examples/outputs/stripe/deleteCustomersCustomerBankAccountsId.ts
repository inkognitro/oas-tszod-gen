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
import {Payment_source, Deleted_payment_source, Error} from './schemas';

export const deleteCustomersCustomerBankAccountsIdEndpointSchema = {
  path: '/v1/customers/{customer}/bank_accounts/{id}',
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

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
} from '@example-outputs/stripe/core';
import {Bank_account, Error} from '@example-outputs/stripe';

export const getCustomersCustomerBankAccountsIdEndpointSchema = {
  path: '/v1/customers/{customer}/bank_accounts/{id}',
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

export type GetCustomersCustomerBankAccountsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCustomersCustomerBankAccountsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Bank_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerBankAccountsIdRequestResult = RequestResult<
  GetCustomersCustomerBankAccountsIdRequest,
  GetCustomersCustomerBankAccountsIdResponse
>;

export function getCustomersCustomerBankAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerBankAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerBankAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerBankAccountsIdEndpointSchema, payload),
    config
  );
}

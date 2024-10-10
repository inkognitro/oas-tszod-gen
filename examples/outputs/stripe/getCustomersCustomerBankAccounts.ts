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
import {Bank_account, Error} from './schemas';

export const getCustomersCustomerBankAccountsEndpointSchema = {
  path: '/v1/customers/{customer}/bank_accounts',
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

export type GetCustomersCustomerBankAccountsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetCustomersCustomerBankAccountsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Bank_account[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerBankAccountsRequestResult = RequestResult<
  GetCustomersCustomerBankAccountsRequest,
  GetCustomersCustomerBankAccountsResponse
>;

export function getCustomersCustomerBankAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerBankAccountsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerBankAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerBankAccountsEndpointSchema, payload),
    config
  );
}

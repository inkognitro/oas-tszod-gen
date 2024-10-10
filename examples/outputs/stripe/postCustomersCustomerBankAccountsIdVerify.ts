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

export const postCustomersCustomerBankAccountsIdVerifyEndpointSchema = {
  path: '/v1/customers/{customer}/bank_accounts/{id}/verify',
  method: 'post',
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

export type PostCustomersCustomerBankAccountsIdVerifyRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amounts?: number[]; // item: int
      expand?: string[];
    }
  >,
  {
    customer: string;
    id: string;
  }
>;

export type PostCustomersCustomerBankAccountsIdVerifyResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Bank_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerBankAccountsIdVerifyRequestResult =
  RequestResult<
    PostCustomersCustomerBankAccountsIdVerifyRequest,
    PostCustomersCustomerBankAccountsIdVerifyResponse
  >;

export function postCustomersCustomerBankAccountsIdVerify(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerBankAccountsIdVerifyRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerBankAccountsIdVerifyRequestResult> {
  return requestHandler.execute(
    createRequest(
      postCustomersCustomerBankAccountsIdVerifyEndpointSchema,
      payload
    ),
    config
  );
}

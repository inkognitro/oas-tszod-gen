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
import {External_account, Error} from '@example-outputs/stripe';

export const postAccountsAccountBankAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/bank_accounts/{id}',
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

export type PostAccountsAccountBankAccountsIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      account_holder_name?: string;
      account_holder_type?: '' | 'company' | 'individual';
      account_type?: 'checking' | 'futsu' | 'savings' | 'toza';
      address_city?: string;
      address_country?: string;
      address_line1?: string;
      address_line2?: string;
      address_state?: string;
      address_zip?: string;
      default_for_currency?: boolean;
      documents?: {
        bank_account_ownership_verification?: {
          files?: string[];
        };
      };
      exp_month?: string;
      exp_year?: string;
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      name?: string;
    }
  >,
  {
    account: string;
    id: string;
  }
>;

export type PostAccountsAccountBankAccountsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', External_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountBankAccountsIdRequestResult = RequestResult<
  PostAccountsAccountBankAccountsIdRequest,
  PostAccountsAccountBankAccountsIdResponse
>;

export function postAccountsAccountBankAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountBankAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountBankAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountsAccountBankAccountsIdEndpointSchema, payload),
    config
  );
}

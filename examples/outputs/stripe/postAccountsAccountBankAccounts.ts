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
import {External_account, Error} from './schemas';

export const postAccountsAccountBankAccountsEndpointSchema = {
  path: '/v1/accounts/{account}/bank_accounts',
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

export type PostAccountsAccountBankAccountsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      bank_account?: (
        | {
            account_holder_name?: string;
            account_holder_type?: 'company' | 'individual';
            account_number: string;
            account_type?: 'checking' | 'futsu' | 'savings' | 'toza';
            country: string;
            currency?: string;
            documents?: {
              bank_account_ownership_verification?: {
                files?: string[];
              };
            };
            object?: 'bank_account';
            routing_number?: string;
          }
        | string
      ) &
        Partial<{
          account_holder_name?: string;
          account_holder_type?: 'company' | 'individual';
          account_number: string;
          account_type?: 'checking' | 'futsu' | 'savings' | 'toza';
          country: string;
          currency?: string;
          documents?: {
            bank_account_ownership_verification?: {
              files?: string[];
            };
          };
          object?: 'bank_account';
          routing_number?: string;
        }>;
      default_for_currency?: boolean;
      expand?: string[];
      external_account?: string;
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    account: string;
  }
>;

export type PostAccountsAccountBankAccountsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', External_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountBankAccountsRequestResult = RequestResult<
  PostAccountsAccountBankAccountsRequest,
  PostAccountsAccountBankAccountsResponse
>;

export function postAccountsAccountBankAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountBankAccountsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountBankAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountsAccountBankAccountsEndpointSchema, payload),
    config
  );
}

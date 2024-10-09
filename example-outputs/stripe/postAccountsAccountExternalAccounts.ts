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

export const postAccountsAccountExternalAccountsEndpointSchema = {
  path: '/v1/accounts/{account}/external_accounts',
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

export type PostAccountsAccountExternalAccountsRequest = RequestUnion<
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

export type PostAccountsAccountExternalAccountsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', External_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountExternalAccountsRequestResult = RequestResult<
  PostAccountsAccountExternalAccountsRequest,
  PostAccountsAccountExternalAccountsResponse
>;

export function postAccountsAccountExternalAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountExternalAccountsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountExternalAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountsAccountExternalAccountsEndpointSchema, payload),
    config
  );
}

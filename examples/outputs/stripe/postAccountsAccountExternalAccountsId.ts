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

export const postAccountsAccountExternalAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/external_accounts/{id}',
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

export type PostAccountsAccountExternalAccountsIdRequest = RequestUnion<
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

export type PostAccountsAccountExternalAccountsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', External_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostAccountsAccountExternalAccountsIdRequestResult = RequestResult<
  PostAccountsAccountExternalAccountsIdRequest,
  PostAccountsAccountExternalAccountsIdResponse
>;

export function postAccountsAccountExternalAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostAccountsAccountExternalAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostAccountsAccountExternalAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(postAccountsAccountExternalAccountsIdEndpointSchema, payload),
    config
  );
}

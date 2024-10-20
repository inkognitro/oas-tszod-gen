import {z_External_account, z_Error, External_account, Error} from './schemas';
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

export const postAccountsAccountBankAccountsEndpointSchema = {
  path: '/v1/accounts/{account}/bank_accounts',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        bank_account: z
          .union([
            z.object({
              account_holder_name: z.string().optional(),
              account_holder_type: z.enum(['company', 'individual']).optional(),
              account_number: z.string(),
              account_type: z
                .enum(['checking', 'futsu', 'savings', 'toza'])
                .optional(),
              country: z.string(),
              currency: z.string().optional(),
              documents: z
                .object({
                  bank_account_ownership_verification: z
                    .object({
                      files: z.array(z.string()).optional(),
                    })
                    .optional(),
                })
                .optional(),
              object: z.enum(['bank_account']).optional(),
              routing_number: z.string().optional(),
            }),
            z.string(),
          ])
          .optional(),
        default_for_currency: z.boolean().optional(),
        expand: z.array(z.string()).optional(),
        external_account: z.string().optional(),
        metadata: z.record(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_External_account,
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

import {
  z_External_account,
  z_Error,
  External_account,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postAccountsAccountBankAccountsIdEndpointSchema = {
  path: '/v1/accounts/{account}/bank_accounts/{id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    account: z.string(),
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        account_holder_name: z.string().optional(),
        account_holder_type: z.enum(['', 'company', 'individual']).optional(),
        account_type: z
          .enum(['checking', 'futsu', 'savings', 'toza'])
          .optional(),
        address_city: z.string().optional(),
        address_country: z.string().optional(),
        address_line1: z.string().optional(),
        address_line2: z.string().optional(),
        address_state: z.string().optional(),
        address_zip: z.string().optional(),
        default_for_currency: z.boolean().optional(),
        documents: z
          .object({
            bank_account_ownership_verification: z
              .object({
                files: z.array(z.string()).optional(),
              })
              .optional(),
          })
          .optional(),
        exp_month: z.string().optional(),
        exp_year: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        name: z.string().optional(),
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

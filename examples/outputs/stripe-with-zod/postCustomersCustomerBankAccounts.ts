import {z_Payment_source, z_Error, Payment_source, Error} from './schemas';
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

export const postCustomersCustomerBankAccountsEndpointSchema = {
  path: '/v1/customers/{customer}/bank_accounts',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        alipay_account: z.string().optional(),
        bank_account: z
          .union([
            z.object({
              account_holder_name: z.string().optional(),
              account_holder_type: z.enum(['company', 'individual']).optional(),
              account_number: z.string(),
              country: z.string(),
              currency: z.string().optional(),
              object: z.enum(['bank_account']).optional(),
              routing_number: z.string().optional(),
            }),
            z.string(),
          ])
          .optional(),
        card: z
          .union([
            z.object({
              address_city: z.string().optional(),
              address_country: z.string().optional(),
              address_line1: z.string().optional(),
              address_line2: z.string().optional(),
              address_state: z.string().optional(),
              address_zip: z.string().optional(),
              cvc: z.string().optional(),
              exp_month: z.number().int().safe().finite(),
              exp_year: z.number().int().safe().finite(),
              metadata: z.record(z.string()).optional(),
              name: z.string().optional(),
              number: z.string(),
              object: z.enum(['card']).optional(),
            }),
            z.string(),
          ])
          .optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        source: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Payment_source,
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

export type PostCustomersCustomerBankAccountsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      alipay_account?: string;
      bank_account?: (
        | {
            account_holder_name?: string;
            account_holder_type?: 'company' | 'individual';
            account_number: string;
            country: string;
            currency?: string;
            object?: 'bank_account';
            routing_number?: string;
          }
        | string
      ) &
        Partial<{
          account_holder_name?: string;
          account_holder_type?: 'company' | 'individual';
          account_number: string;
          country: string;
          currency?: string;
          object?: 'bank_account';
          routing_number?: string;
        }>;
      card?: (
        | {
            address_city?: string;
            address_country?: string;
            address_line1?: string;
            address_line2?: string;
            address_state?: string;
            address_zip?: string;
            cvc?: string;
            exp_month: number; // int
            exp_year: number; // int
            metadata?: {
              [key: string]: string;
            };
            name?: string;
            number: string;
            object?: 'card';
          }
        | string
      ) &
        Partial<{
          address_city?: string;
          address_country?: string;
          address_line1?: string;
          address_line2?: string;
          address_state?: string;
          address_zip?: string;
          cvc?: string;
          exp_month: number; // int
          exp_year: number; // int
          metadata?: {
            [key: string]: string;
          };
          name?: string;
          number: string;
          object?: 'card';
        }>;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      source?: string;
    }
  >,
  {
    customer: string;
  }
>;

export type PostCustomersCustomerBankAccountsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_source>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerBankAccountsRequestResult = RequestResult<
  PostCustomersCustomerBankAccountsRequest,
  PostCustomersCustomerBankAccountsResponse
>;

export function postCustomersCustomerBankAccounts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerBankAccountsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerBankAccountsRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomersCustomerBankAccountsEndpointSchema, payload),
    config
  );
}

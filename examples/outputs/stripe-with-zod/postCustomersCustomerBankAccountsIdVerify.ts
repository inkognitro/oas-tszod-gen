import {z_Bank_account, z_Error, Bank_account, Error} from './schemas';
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

export const postCustomersCustomerBankAccountsIdVerifyEndpointSchema = {
  path: '/v1/customers/{customer}/bank_accounts/{id}/verify',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amounts: z.array(z.number().int().safe().finite()).optional(),
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Bank_account,
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

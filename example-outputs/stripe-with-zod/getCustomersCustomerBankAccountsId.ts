import {
  z_Bank_account,
  z_Error,
  Bank_account,
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

export const getCustomersCustomerBankAccountsIdEndpointSchema = {
  path: '/v1/customers/{customer}/bank_accounts/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    customer: z.string(),
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
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

export type GetCustomersCustomerBankAccountsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCustomersCustomerBankAccountsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Bank_account>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerBankAccountsIdRequestResult = RequestResult<
  GetCustomersCustomerBankAccountsIdRequest,
  GetCustomersCustomerBankAccountsIdResponse
>;

export function getCustomersCustomerBankAccountsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerBankAccountsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerBankAccountsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerBankAccountsIdEndpointSchema, payload),
    config
  );
}

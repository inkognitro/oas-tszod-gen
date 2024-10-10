import {z_Cash_balance, z_Error, Cash_balance, Error} from './schemas';
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

export const postCustomersCustomerCashBalanceEndpointSchema = {
  path: '/v1/customers/{customer}/cash_balance',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    customer: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        settings: z
          .object({
            reconciliation_mode: z
              .enum(['automatic', 'manual', 'merchant_default'])
              .optional(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Cash_balance,
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

export type PostCustomersCustomerCashBalanceRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      settings?: {
        reconciliation_mode?: 'automatic' | 'manual' | 'merchant_default';
      };
    }
  >,
  {
    customer: string;
  }
>;

export type PostCustomersCustomerCashBalanceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Cash_balance>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCustomersCustomerCashBalanceRequestResult = RequestResult<
  PostCustomersCustomerCashBalanceRequest,
  PostCustomersCustomerCashBalanceResponse
>;

export function postCustomersCustomerCashBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCustomersCustomerCashBalanceRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCustomersCustomerCashBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(postCustomersCustomerCashBalanceEndpointSchema, payload),
    config
  );
}

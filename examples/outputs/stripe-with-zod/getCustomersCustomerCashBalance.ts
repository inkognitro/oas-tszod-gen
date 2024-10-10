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

export const getCustomersCustomerCashBalanceEndpointSchema = {
  path: '/v1/customers/{customer}/cash_balance',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    customer: z.string(),
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

export type GetCustomersCustomerCashBalanceRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    expand?: string[];
  }
>;

export type GetCustomersCustomerCashBalanceResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Cash_balance>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerCashBalanceRequestResult = RequestResult<
  GetCustomersCustomerCashBalanceRequest,
  GetCustomersCustomerCashBalanceResponse
>;

export function getCustomersCustomerCashBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerCashBalanceRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerCashBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerCashBalanceEndpointSchema, payload),
    config
  );
}

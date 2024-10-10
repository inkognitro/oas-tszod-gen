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
import {Cash_balance, Error} from './schemas';

export const postCustomersCustomerCashBalanceEndpointSchema = {
  path: '/v1/customers/{customer}/cash_balance',
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

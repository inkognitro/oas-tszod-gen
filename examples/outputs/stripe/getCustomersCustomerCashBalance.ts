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

export const getCustomersCustomerCashBalanceEndpointSchema = {
  path: '/v1/customers/{customer}/cash_balance',
  method: 'get',
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

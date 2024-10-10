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
import {Customer_cash_balance_transaction, Error} from './schemas';

export const postTestHelpersCustomersCustomerFundCashBalanceEndpointSchema = {
  path: '/v1/test_helpers/customers/{customer}/fund_cash_balance',
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

export type PostTestHelpersCustomersCustomerFundCashBalanceRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        amount: number; // int
        currency: string;
        expand?: string[];
        reference?: string;
      }
    >,
    {
      customer: string;
    }
  >;

export type PostTestHelpersCustomersCustomerFundCashBalanceResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Customer_cash_balance_transaction>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersCustomersCustomerFundCashBalanceRequestResult =
  RequestResult<
    PostTestHelpersCustomersCustomerFundCashBalanceRequest,
    PostTestHelpersCustomersCustomerFundCashBalanceResponse
  >;

export function postTestHelpersCustomersCustomerFundCashBalance(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersCustomersCustomerFundCashBalanceRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersCustomersCustomerFundCashBalanceRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersCustomersCustomerFundCashBalanceEndpointSchema,
      payload
    ),
    config
  );
}

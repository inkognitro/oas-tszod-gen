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
} from '@example-outputs/stripe/core';
import {Payment_method, Error} from '@example-outputs/stripe';

export const getCustomersCustomerPaymentMethodsEndpointSchema = {
  path: '/v1/customers/{customer}/payment_methods',
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

export type GetCustomersCustomerPaymentMethodsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    allow_redisplay?: 'always' | 'limited' | 'unspecified';
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    type?:
      | 'acss_debit'
      | 'affirm'
      | 'afterpay_clearpay'
      | 'alipay'
      | 'amazon_pay'
      | 'au_becs_debit'
      | 'bacs_debit'
      | 'bancontact'
      | 'blik'
      | 'boleto'
      | 'card'
      | 'cashapp'
      | 'customer_balance'
      | 'eps'
      | 'fpx'
      | 'giropay'
      | 'grabpay'
      | 'ideal'
      | 'klarna'
      | 'konbini'
      | 'link'
      | 'mobilepay'
      | 'multibanco'
      | 'oxxo'
      | 'p24'
      | 'paynow'
      | 'paypal'
      | 'pix'
      | 'promptpay'
      | 'revolut_pay'
      | 'sepa_debit'
      | 'sofort'
      | 'swish'
      | 'twint'
      | 'us_bank_account'
      | 'wechat_pay'
      | 'zip';
  }
>;

export type GetCustomersCustomerPaymentMethodsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Payment_method[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerPaymentMethodsRequestResult = RequestResult<
  GetCustomersCustomerPaymentMethodsRequest,
  GetCustomersCustomerPaymentMethodsResponse
>;

export function getCustomersCustomerPaymentMethods(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerPaymentMethodsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerPaymentMethodsRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerPaymentMethodsEndpointSchema, payload),
    config
  );
}

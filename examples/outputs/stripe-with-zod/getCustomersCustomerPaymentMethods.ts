import {z_Payment_method, z_Error, Payment_method, Error} from './schemas';
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

export const getCustomersCustomerPaymentMethodsEndpointSchema = {
  path: '/v1/customers/{customer}/payment_methods',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    allow_redisplay: z.enum(['always', 'limited', 'unspecified']).optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    type: z
      .enum([
        'acss_debit',
        'affirm',
        'afterpay_clearpay',
        'alipay',
        'amazon_pay',
        'au_becs_debit',
        'bacs_debit',
        'bancontact',
        'blik',
        'boleto',
        'card',
        'cashapp',
        'customer_balance',
        'eps',
        'fpx',
        'giropay',
        'grabpay',
        'ideal',
        'klarna',
        'konbini',
        'link',
        'mobilepay',
        'multibanco',
        'oxxo',
        'p24',
        'paynow',
        'paypal',
        'pix',
        'promptpay',
        'revolut_pay',
        'sepa_debit',
        'sofort',
        'swish',
        'twint',
        'us_bank_account',
        'wechat_pay',
        'zip',
      ])
      .optional(),
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
          zodSchema: z.object({
            data: z.array(z_Payment_method),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
          }),
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

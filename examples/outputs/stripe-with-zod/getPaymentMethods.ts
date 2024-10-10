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

export const getPaymentMethodsEndpointSchema = {
  path: '/v1/payment_methods',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    customer: z.string().optional(),
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
            url: z.string().regex(/\^\/v1\/payment_methods/),
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

export type GetPaymentMethodsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    customer?: string;
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

export type GetPaymentMethodsResponse =
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

export type GetPaymentMethodsRequestResult = RequestResult<
  GetPaymentMethodsRequest,
  GetPaymentMethodsResponse
>;

export function getPaymentMethods(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentMethodsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentMethodsRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentMethodsEndpointSchema, payload),
    config
  );
}

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
import {Invoiceitem, Error} from '@example-outputs/stripe';

export const postInvoiceitemsInvoiceitemEndpointSchema = {
  path: '/v1/invoiceitems/{invoiceitem}',
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

export type PostInvoiceitemsInvoiceitemRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      description?: string;
      discountable?: boolean;
      discounts?:
        | {
            coupon?: string;
            discount?: string;
            promotion_code?: string;
          }[]
        | '';
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      period?: {
        end: number; // int
        start: number; // int
      };
      price?: string;
      price_data?: {
        currency: string;
        product: string;
        tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
        unit_amount?: number; // int
        unit_amount_decimal?: string; // decimal
      };
      quantity?: number; // int
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
      tax_code?: string | '';
      tax_rates?: string[] | '';
      unit_amount?: number; // int
      unit_amount_decimal?: string; // decimal
    }
  >,
  {
    invoiceitem: string;
  }
>;

export type PostInvoiceitemsInvoiceitemResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoiceitem>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoiceitemsInvoiceitemRequestResult = RequestResult<
  PostInvoiceitemsInvoiceitemRequest,
  PostInvoiceitemsInvoiceitemResponse
>;

export function postInvoiceitemsInvoiceitem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoiceitemsInvoiceitemRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoiceitemsInvoiceitemRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoiceitemsInvoiceitemEndpointSchema, payload),
    config
  );
}

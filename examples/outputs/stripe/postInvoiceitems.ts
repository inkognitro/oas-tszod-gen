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
import {Invoiceitem, Error} from './schemas';

export const postInvoiceitemsEndpointSchema = {
  path: '/v1/invoiceitems',
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

export type PostInvoiceitemsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      currency?: string;
      customer: string;
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
      invoice?: string;
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
      subscription?: string;
      tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
      tax_code?: string | '';
      tax_rates?: string[];
      unit_amount?: number; // int
      unit_amount_decimal?: string; // decimal
    }
  >
>;

export type PostInvoiceitemsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoiceitem>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoiceitemsRequestResult = RequestResult<
  PostInvoiceitemsRequest,
  PostInvoiceitemsResponse
>;

export function postInvoiceitems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoiceitemsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoiceitemsRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoiceitemsEndpointSchema, payload),
    config
  );
}

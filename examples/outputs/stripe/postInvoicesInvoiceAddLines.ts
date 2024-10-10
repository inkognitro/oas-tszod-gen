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
import {Invoice, Error} from './schemas';

export const postInvoicesInvoiceAddLinesEndpointSchema = {
  path: '/v1/invoices/{invoice}/add_lines',
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

export type PostInvoicesInvoiceAddLinesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      invoice_metadata?:
        | {
            [key: string]: string;
          }
        | '';
      lines: {
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
        invoice_item?: string;
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
          product?: string;
          product_data?: {
            description?: string;
            images?: string[];
            metadata?: {
              [key: string]: string;
            };
            name: string;
            tax_code?: string;
          };
          tax_behavior?: 'exclusive' | 'inclusive' | 'unspecified';
          unit_amount?: number; // int
          unit_amount_decimal?: string; // decimal
        };
        quantity?: number; // int
        tax_amounts?:
          | {
              amount: number; // int
              tax_rate_data: {
                country?: string;
                description?: string;
                display_name: string;
                inclusive: boolean;
                jurisdiction?: string;
                percentage: number;
                state?: string;
                tax_type?:
                  | 'amusement_tax'
                  | 'communications_tax'
                  | 'gst'
                  | 'hst'
                  | 'igst'
                  | 'jct'
                  | 'lease_tax'
                  | 'pst'
                  | 'qst'
                  | 'rst'
                  | 'sales_tax'
                  | 'vat';
              };
              taxable_amount: number; // int
            }[]
          | '';
        tax_rates?: string[] | '';
      }[];
    }
  >,
  {
    invoice: string;
  }
>;

export type PostInvoicesInvoiceAddLinesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Invoice>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceAddLinesRequestResult = RequestResult<
  PostInvoicesInvoiceAddLinesRequest,
  PostInvoicesInvoiceAddLinesResponse
>;

export function postInvoicesInvoiceAddLines(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceAddLinesRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceAddLinesRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceAddLinesEndpointSchema, payload),
    config
  );
}

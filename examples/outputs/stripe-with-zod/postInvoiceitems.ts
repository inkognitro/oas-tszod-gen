import {z_Invoiceitem, z_Error, Invoiceitem, Error} from './schemas';
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

export const postInvoiceitemsEndpointSchema = {
  path: '/v1/invoiceitems',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        currency: z.string().optional(),
        customer: z.string(),
        description: z.string().optional(),
        discountable: z.boolean().optional(),
        discounts: z
          .union([
            z.array(
              z.object({
                coupon: z.string().optional(),
                discount: z.string().optional(),
                promotion_code: z.string().optional(),
              })
            ),
            z.enum(['']),
          ])
          .optional(),
        expand: z.array(z.string()).optional(),
        invoice: z.string().optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
        period: z
          .object({
            end: z.number().int().safe().finite(),
            start: z.number().int().safe().finite(),
          })
          .optional(),
        price: z.string().optional(),
        price_data: z
          .object({
            currency: z.string(),
            product: z.string(),
            tax_behavior: z
              .enum(['exclusive', 'inclusive', 'unspecified'])
              .optional(),
            unit_amount: z.number().int().safe().finite().optional(),
            unit_amount_decimal: z.string().optional(),
          })
          .optional(),
        quantity: z.number().int().safe().finite().optional(),
        subscription: z.string().optional(),
        tax_behavior: z
          .enum(['exclusive', 'inclusive', 'unspecified'])
          .optional(),
        tax_code: z.union([z.string(), z.enum([''])]).optional(),
        tax_rates: z.array(z.string()).optional(),
        unit_amount: z.number().int().safe().finite().optional(),
        unit_amount_decimal: z.string().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Invoiceitem,
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

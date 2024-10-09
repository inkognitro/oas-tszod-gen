import {
  z_Line_item,
  z_Error,
  Line_item,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postInvoicesInvoiceLinesLineItemIdEndpointSchema = {
  path: '/v1/invoices/{invoice}/lines/{line_item_id}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    invoice: z.string(),
    line_item_id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
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
            product: z.string().optional(),
            product_data: z
              .object({
                description: z.string().optional(),
                images: z.array(z.string()).optional(),
                metadata: z.record(z.string()).optional(),
                name: z.string(),
                tax_code: z.string().optional(),
              })
              .optional(),
            tax_behavior: z
              .enum(['exclusive', 'inclusive', 'unspecified'])
              .optional(),
            unit_amount: z.number().int().safe().finite().optional(),
            unit_amount_decimal: z.string().optional(),
          })
          .optional(),
        quantity: z.number().int().safe().finite().optional(),
        tax_amounts: z
          .union([
            z.array(
              z.object({
                amount: z.number().int().safe().finite(),
                tax_rate_data: z.object({
                  country: z.string().optional(),
                  description: z.string().optional(),
                  display_name: z.string(),
                  inclusive: z.boolean(),
                  jurisdiction: z.string().optional(),
                  percentage: z.number().safe().finite(),
                  state: z.string().optional(),
                  tax_type: z
                    .enum([
                      'amusement_tax',
                      'communications_tax',
                      'gst',
                      'hst',
                      'igst',
                      'jct',
                      'lease_tax',
                      'pst',
                      'qst',
                      'rst',
                      'sales_tax',
                      'vat',
                    ])
                    .optional(),
                }),
                taxable_amount: z.number().int().safe().finite(),
              })
            ),
            z.enum(['']),
          ])
          .optional(),
        tax_rates: z.union([z.array(z.string()), z.enum([''])]).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Line_item,
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

export type PostInvoicesInvoiceLinesLineItemIdRequest = RequestUnion<
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
    }
  >,
  {
    invoice: string;
    line_item_id: string;
  }
>;

export type PostInvoicesInvoiceLinesLineItemIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Line_item>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostInvoicesInvoiceLinesLineItemIdRequestResult = RequestResult<
  PostInvoicesInvoiceLinesLineItemIdRequest,
  PostInvoicesInvoiceLinesLineItemIdResponse
>;

export function postInvoicesInvoiceLinesLineItemId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostInvoicesInvoiceLinesLineItemIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostInvoicesInvoiceLinesLineItemIdRequestResult> {
  return requestHandler.execute(
    createRequest(postInvoicesInvoiceLinesLineItemIdEndpointSchema, payload),
    config
  );
}

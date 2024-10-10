import {
  z_Credit_note_line_item,
  z_Error,
  Credit_note_line_item,
  Error,
} from './schemas';
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

export const getCreditNotesPreviewLinesEndpointSchema = {
  path: '/v1/credit_notes/preview/lines',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    amount: z.number().int().safe().finite().optional(),
    credit_amount: z.number().int().safe().finite().optional(),
    effective_at: z.number().int().safe().finite().optional(),
    email_type: z.enum(['credit_note', 'none']).optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    invoice: z.string(),
    limit: z.number().int().safe().finite().optional(),
    lines: z
      .array(
        z.object({
          amount: z.number().int().safe().finite().optional(),
          description: z.string().optional(),
          invoice_line_item: z.string().optional(),
          quantity: z.number().int().safe().finite().optional(),
          tax_amounts: z
            .union([
              z.array(
                z.object({
                  amount: z.number().int().safe().finite(),
                  tax_rate: z.string(),
                  taxable_amount: z.number().int().safe().finite(),
                })
              ),
              z.enum(['']),
            ])
            .optional(),
          tax_rates: z.union([z.array(z.string()), z.enum([''])]).optional(),
          type: z.enum(['custom_line_item', 'invoice_line_item']),
          unit_amount: z.number().int().safe().finite().optional(),
          unit_amount_decimal: z.string().optional(),
        })
      )
      .optional(),
    memo: z.string().optional(),
    metadata: z.record(z.string()).optional(),
    out_of_band_amount: z.number().int().safe().finite().optional(),
    reason: z
      .enum([
        'duplicate',
        'fraudulent',
        'order_change',
        'product_unsatisfactory',
      ])
      .optional(),
    refund: z.string().optional(),
    refund_amount: z.number().int().safe().finite().optional(),
    shipping_cost: z
      .object({
        shipping_rate: z.string().optional(),
      })
      .optional(),
    starting_after: z.string().optional(),
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
            data: z.array(z_Credit_note_line_item),
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

export type GetCreditNotesPreviewLinesRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    amount?: number; // int
    credit_amount?: number; // int
    effective_at?: number; // int
    email_type?: 'credit_note' | 'none';
    ending_before?: string;
    expand?: string[];
    invoice: string;
    limit?: number; // int
    lines?: {
      amount?: number; // int
      description?: string;
      invoice_line_item?: string;
      quantity?: number; // int
      tax_amounts?:
        | {
            amount: number; // int
            tax_rate: string;
            taxable_amount: number; // int
          }[]
        | '';
      tax_rates?: string[] | '';
      type: 'custom_line_item' | 'invoice_line_item';
      unit_amount?: number; // int
      unit_amount_decimal?: string; // decimal
    }[];
    memo?: string;
    metadata?: {
      [key: string]: string;
    };
    out_of_band_amount?: number; // int
    reason?:
      | 'duplicate'
      | 'fraudulent'
      | 'order_change'
      | 'product_unsatisfactory';
    refund?: string;
    refund_amount?: number; // int
    shipping_cost?: {
      shipping_rate?: string;
    };
    starting_after?: string;
  }
>;

export type GetCreditNotesPreviewLinesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Credit_note_line_item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCreditNotesPreviewLinesRequestResult = RequestResult<
  GetCreditNotesPreviewLinesRequest,
  GetCreditNotesPreviewLinesResponse
>;

export function getCreditNotesPreviewLines(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCreditNotesPreviewLinesRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCreditNotesPreviewLinesRequestResult> {
  return requestHandler.execute(
    createRequest(getCreditNotesPreviewLinesEndpointSchema, payload),
    config
  );
}

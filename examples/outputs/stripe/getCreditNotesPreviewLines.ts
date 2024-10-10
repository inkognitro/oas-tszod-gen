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
import {Credit_note_line_item, Error} from './schemas';

export const getCreditNotesPreviewLinesEndpointSchema = {
  path: '/v1/credit_notes/preview/lines',
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

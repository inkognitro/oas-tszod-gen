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
import {Credit_note, Error} from './schemas';

export const getCreditNotesPreviewEndpointSchema = {
  path: '/v1/credit_notes/preview',
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

export type GetCreditNotesPreviewRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    amount?: number; // int
    credit_amount?: number; // int
    effective_at?: number; // int
    email_type?: 'credit_note' | 'none';
    expand?: string[];
    invoice: string;
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
  }
>;

export type GetCreditNotesPreviewResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Credit_note>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCreditNotesPreviewRequestResult = RequestResult<
  GetCreditNotesPreviewRequest,
  GetCreditNotesPreviewResponse
>;

export function getCreditNotesPreview(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCreditNotesPreviewRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCreditNotesPreviewRequestResult> {
  return requestHandler.execute(
    createRequest(getCreditNotesPreviewEndpointSchema, payload),
    config
  );
}

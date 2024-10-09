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
import {Credit_note, Error} from '@example-outputs/stripe';

export const postCreditNotesEndpointSchema = {
  path: '/v1/credit_notes',
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

export type PostCreditNotesRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
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
  >
>;

export type PostCreditNotesResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Credit_note>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostCreditNotesRequestResult = RequestResult<
  PostCreditNotesRequest,
  PostCreditNotesResponse
>;

export function postCreditNotes(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostCreditNotesRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostCreditNotesRequestResult> {
  return requestHandler.execute(
    createRequest(postCreditNotesEndpointSchema, payload),
    config
  );
}

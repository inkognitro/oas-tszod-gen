import {z_Tax_Transaction, Tax_Transaction} from './tax';
import {z_Error, Error} from './schemas';
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

export const postTaxTransactionsCreateReversalEndpointSchema = {
  path: '/v1/tax/transactions/create_reversal',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        flat_amount: z.number().int().safe().finite().optional(),
        line_items: z
          .array(
            z.object({
              amount: z.number().int().safe().finite(),
              amount_tax: z.number().int().safe().finite(),
              metadata: z.record(z.string()).optional(),
              original_line_item: z.string(),
              quantity: z.number().int().safe().finite().optional(),
              reference: z.string(),
            })
          )
          .optional(),
        metadata: z.record(z.string()).optional(),
        mode: z.enum(['full', 'partial']),
        original_transaction: z.string(),
        reference: z.string(),
        shipping_cost: z
          .object({
            amount: z.number().int().safe().finite(),
            amount_tax: z.number().int().safe().finite(),
          })
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Tax_Transaction,
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

export type PostTaxTransactionsCreateReversalRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      flat_amount?: number; // int
      line_items?: {
        amount: number; // int
        amount_tax: number; // int
        metadata?: {
          [key: string]: string;
        };
        original_line_item: string;
        quantity?: number; // int
        reference: string;
      }[];
      metadata?: {
        [key: string]: string;
      };
      mode: 'full' | 'partial';
      original_transaction: string;
      reference: string;
      shipping_cost?: {
        amount: number; // int
        amount_tax: number; // int
      };
    }
  >
>;

export type PostTaxTransactionsCreateReversalResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Transaction>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxTransactionsCreateReversalRequestResult = RequestResult<
  PostTaxTransactionsCreateReversalRequest,
  PostTaxTransactionsCreateReversalResponse
>;

export function postTaxTransactionsCreateReversal(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxTransactionsCreateReversalRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxTransactionsCreateReversalRequestResult> {
  return requestHandler.execute(
    createRequest(postTaxTransactionsCreateReversalEndpointSchema, payload),
    config
  );
}

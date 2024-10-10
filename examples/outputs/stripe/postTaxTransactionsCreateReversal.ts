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
import {Tax_Transaction} from './tax';
import {Error} from './schemas';

export const postTaxTransactionsCreateReversalEndpointSchema = {
  path: '/v1/tax/transactions/create_reversal',
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

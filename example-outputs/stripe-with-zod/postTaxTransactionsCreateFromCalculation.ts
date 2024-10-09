import {
  z_Tax_Transaction,
  z_Error,
  Tax_Transaction,
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

export const postTaxTransactionsCreateFromCalculationEndpointSchema = {
  path: '/v1/tax/transactions/create_from_calculation',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        calculation: z.string(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        posted_at: z.number().int().safe().finite().optional(),
        reference: z.string(),
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

export type PostTaxTransactionsCreateFromCalculationRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      calculation: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      posted_at?: number; // int
      reference: string;
    }
  >
>;

export type PostTaxTransactionsCreateFromCalculationResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Tax_Transaction>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTaxTransactionsCreateFromCalculationRequestResult =
  RequestResult<
    PostTaxTransactionsCreateFromCalculationRequest,
    PostTaxTransactionsCreateFromCalculationResponse
  >;

export function postTaxTransactionsCreateFromCalculation(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTaxTransactionsCreateFromCalculationRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTaxTransactionsCreateFromCalculationRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTaxTransactionsCreateFromCalculationEndpointSchema,
      payload
    ),
    config
  );
}

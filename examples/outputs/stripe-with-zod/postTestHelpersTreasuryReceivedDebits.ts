import {z_Treasury_Received_debit, Treasury_Received_debit} from './treasury';
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

export const postTestHelpersTreasuryReceivedDebitsEndpointSchema = {
  path: '/v1/test_helpers/treasury/received_debits',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite(),
        currency: z.string(),
        description: z.string().optional(),
        expand: z.array(z.string()).optional(),
        financial_account: z.string(),
        initiating_payment_method_details: z
          .object({
            type: z.enum(['us_bank_account']),
            us_bank_account: z
              .object({
                account_holder_name: z.string().optional(),
                account_number: z.string().optional(),
                routing_number: z.string().optional(),
              })
              .optional(),
          })
          .optional(),
        network: z.enum(['ach']),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Received_debit,
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

export type PostTestHelpersTreasuryReceivedDebitsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      description?: string;
      expand?: string[];
      financial_account: string;
      initiating_payment_method_details?: {
        type: 'us_bank_account';
        us_bank_account?: {
          account_holder_name?: string;
          account_number?: string;
          routing_number?: string;
        };
      };
      network: 'ach';
    }
  >
>;

export type PostTestHelpersTreasuryReceivedDebitsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Received_debit>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryReceivedDebitsRequestResult = RequestResult<
  PostTestHelpersTreasuryReceivedDebitsRequest,
  PostTestHelpersTreasuryReceivedDebitsResponse
>;

export function postTestHelpersTreasuryReceivedDebits(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryReceivedDebitsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryReceivedDebitsRequestResult> {
  return requestHandler.execute(
    createRequest(postTestHelpersTreasuryReceivedDebitsEndpointSchema, payload),
    config
  );
}

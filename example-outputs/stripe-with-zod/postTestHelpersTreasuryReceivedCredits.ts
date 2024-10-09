import {
  z_Treasury_Received_credit,
  z_Error,
  Treasury_Received_credit,
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

export const postTestHelpersTreasuryReceivedCreditsEndpointSchema = {
  path: '/v1/test_helpers/treasury/received_credits',
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
        network: z.enum(['ach', 'us_domestic_wire']),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Treasury_Received_credit,
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

export type PostTestHelpersTreasuryReceivedCreditsRequest = RequestUnion<
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
      network: 'ach' | 'us_domestic_wire';
    }
  >
>;

export type PostTestHelpersTreasuryReceivedCreditsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Received_credit>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryReceivedCreditsRequestResult = RequestResult<
  PostTestHelpersTreasuryReceivedCreditsRequest,
  PostTestHelpersTreasuryReceivedCreditsResponse
>;

export function postTestHelpersTreasuryReceivedCredits(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryReceivedCreditsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryReceivedCreditsRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryReceivedCreditsEndpointSchema,
      payload
    ),
    config
  );
}

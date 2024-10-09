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

export const getTreasuryReceivedCreditsEndpointSchema = {
  path: '/v1/treasury/received_credits',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    financial_account: z.string(),
    limit: z.number().int().safe().finite().optional(),
    linked_flows: z
      .object({
        source_flow_type: z.enum([
          'credit_reversal',
          'other',
          'outbound_payment',
          'payout',
        ]),
      })
      .optional(),
    starting_after: z.string().optional(),
    status: z.enum(['failed', 'succeeded']).optional(),
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
            data: z.array(z_Treasury_Received_credit),
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

export type GetTreasuryReceivedCreditsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    financial_account: string;
    limit?: number; // int
    linked_flows?: {
      source_flow_type:
        | 'credit_reversal'
        | 'other'
        | 'outbound_payment'
        | 'payout';
    };
    starting_after?: string;
    status?: 'failed' | 'succeeded';
  }
>;

export type GetTreasuryReceivedCreditsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Treasury_Received_credit[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetTreasuryReceivedCreditsRequestResult = RequestResult<
  GetTreasuryReceivedCreditsRequest,
  GetTreasuryReceivedCreditsResponse
>;

export function getTreasuryReceivedCredits(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetTreasuryReceivedCreditsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetTreasuryReceivedCreditsRequestResult> {
  return requestHandler.execute(
    createRequest(getTreasuryReceivedCreditsEndpointSchema, payload),
    config
  );
}

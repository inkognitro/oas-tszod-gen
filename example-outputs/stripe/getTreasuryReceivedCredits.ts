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
import {Treasury_Received_credit, Error} from '@example-outputs/stripe';

export const getTreasuryReceivedCreditsEndpointSchema = {
  path: '/v1/treasury/received_credits',
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

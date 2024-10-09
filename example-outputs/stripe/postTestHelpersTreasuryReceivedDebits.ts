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
import {Treasury_Received_debit, Error} from '@example-outputs/stripe';

export const postTestHelpersTreasuryReceivedDebitsEndpointSchema = {
  path: '/v1/test_helpers/treasury/received_debits',
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

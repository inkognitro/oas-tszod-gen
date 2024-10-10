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
import {Treasury_Received_credit} from './treasury';
import {Error} from './schemas';

export const postTestHelpersTreasuryReceivedCreditsEndpointSchema = {
  path: '/v1/test_helpers/treasury/received_credits',
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

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
import {Treasury_Inbound_transfer, Error} from '@example-outputs/stripe';

export const postTestHelpersTreasuryInboundTransfersIdFailEndpointSchema = {
  path: '/v1/test_helpers/treasury/inbound_transfers/{id}/fail',
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

export type PostTestHelpersTreasuryInboundTransfersIdFailRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      failure_details?: {
        code?:
          | 'account_closed'
          | 'account_frozen'
          | 'bank_account_restricted'
          | 'bank_ownership_changed'
          | 'debit_not_authorized'
          | 'incorrect_account_holder_address'
          | 'incorrect_account_holder_name'
          | 'incorrect_account_holder_tax_id'
          | 'insufficient_funds'
          | 'invalid_account_number'
          | 'invalid_currency'
          | 'no_account'
          | 'other';
      };
    }
  >,
  {
    id: string;
  }
>;

export type PostTestHelpersTreasuryInboundTransfersIdFailResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Inbound_transfer>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTestHelpersTreasuryInboundTransfersIdFailRequestResult =
  RequestResult<
    PostTestHelpersTreasuryInboundTransfersIdFailRequest,
    PostTestHelpersTreasuryInboundTransfersIdFailResponse
  >;

export function postTestHelpersTreasuryInboundTransfersIdFail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTestHelpersTreasuryInboundTransfersIdFailRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTestHelpersTreasuryInboundTransfersIdFailRequestResult> {
  return requestHandler.execute(
    createRequest(
      postTestHelpersTreasuryInboundTransfersIdFailEndpointSchema,
      payload
    ),
    config
  );
}

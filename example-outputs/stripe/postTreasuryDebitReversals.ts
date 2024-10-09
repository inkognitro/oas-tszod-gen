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
import {Treasury_Debit_reversal, Error} from '@example-outputs/stripe';

export const postTreasuryDebitReversalsEndpointSchema = {
  path: '/v1/treasury/debit_reversals',
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

export type PostTreasuryDebitReversalsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      received_debit: string;
    }
  >
>;

export type PostTreasuryDebitReversalsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Debit_reversal>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryDebitReversalsRequestResult = RequestResult<
  PostTreasuryDebitReversalsRequest,
  PostTreasuryDebitReversalsResponse
>;

export function postTreasuryDebitReversals(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryDebitReversalsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryDebitReversalsRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryDebitReversalsEndpointSchema, payload),
    config
  );
}

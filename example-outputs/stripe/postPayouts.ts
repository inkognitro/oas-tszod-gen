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
import {Payout, Error} from '@example-outputs/stripe';

export const postPayoutsEndpointSchema = {
  path: '/v1/payouts',
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

export type PostPayoutsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount: number; // int
      currency: string;
      description?: string;
      destination?: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      method?: 'instant' | 'standard';
      source_type?: 'bank_account' | 'card' | 'fpx';
      statement_descriptor?: string;
    }
  >
>;

export type PostPayoutsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPayoutsRequestResult = RequestResult<
  PostPayoutsRequest,
  PostPayoutsResponse
>;

export function postPayouts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPayoutsRequest, 'contentType' | 'body', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPayoutsRequestResult> {
  return requestHandler.execute(
    createRequest(postPayoutsEndpointSchema, payload),
    config
  );
}

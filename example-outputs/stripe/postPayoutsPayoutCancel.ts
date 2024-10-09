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

export const postPayoutsPayoutCancelEndpointSchema = {
  path: '/v1/payouts/{payout}/cancel',
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

export type PostPayoutsPayoutCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    payout: string;
  }
>;

export type PostPayoutsPayoutCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payout>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostPayoutsPayoutCancelRequestResult = RequestResult<
  PostPayoutsPayoutCancelRequest,
  PostPayoutsPayoutCancelResponse
>;

export function postPayoutsPayoutCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostPayoutsPayoutCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostPayoutsPayoutCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postPayoutsPayoutCancelEndpointSchema, payload),
    config
  );
}

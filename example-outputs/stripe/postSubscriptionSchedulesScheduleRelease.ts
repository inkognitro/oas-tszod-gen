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
import {Subscription_schedule, Error} from '@example-outputs/stripe';

export const postSubscriptionSchedulesScheduleReleaseEndpointSchema = {
  path: '/v1/subscription_schedules/{schedule}/release',
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

export type PostSubscriptionSchedulesScheduleReleaseRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      preserve_cancel_date?: boolean;
    }
  >,
  {
    schedule: string;
  }
>;

export type PostSubscriptionSchedulesScheduleReleaseResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Subscription_schedule>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSubscriptionSchedulesScheduleReleaseRequestResult =
  RequestResult<
    PostSubscriptionSchedulesScheduleReleaseRequest,
    PostSubscriptionSchedulesScheduleReleaseResponse
  >;

export function postSubscriptionSchedulesScheduleRelease(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSubscriptionSchedulesScheduleReleaseRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscriptionSchedulesScheduleReleaseRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSubscriptionSchedulesScheduleReleaseEndpointSchema,
      payload
    ),
    config
  );
}

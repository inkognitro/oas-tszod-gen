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
import {Subscription_schedule, Error} from './schemas';

export const postSubscriptionSchedulesScheduleCancelEndpointSchema = {
  path: '/v1/subscription_schedules/{schedule}/cancel',
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

export type PostSubscriptionSchedulesScheduleCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      invoice_now?: boolean;
      prorate?: boolean;
    }
  >,
  {
    schedule: string;
  }
>;

export type PostSubscriptionSchedulesScheduleCancelResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Subscription_schedule>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSubscriptionSchedulesScheduleCancelRequestResult =
  RequestResult<
    PostSubscriptionSchedulesScheduleCancelRequest,
    PostSubscriptionSchedulesScheduleCancelResponse
  >;

export function postSubscriptionSchedulesScheduleCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSubscriptionSchedulesScheduleCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscriptionSchedulesScheduleCancelRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSubscriptionSchedulesScheduleCancelEndpointSchema,
      payload
    ),
    config
  );
}

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

export const getSubscriptionSchedulesScheduleEndpointSchema = {
  path: '/v1/subscription_schedules/{schedule}',
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

export type GetSubscriptionSchedulesScheduleRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    schedule: string;
  },
  {
    expand?: string[];
  }
>;

export type GetSubscriptionSchedulesScheduleResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Subscription_schedule>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSubscriptionSchedulesScheduleRequestResult = RequestResult<
  GetSubscriptionSchedulesScheduleRequest,
  GetSubscriptionSchedulesScheduleResponse
>;

export function getSubscriptionSchedulesSchedule(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSubscriptionSchedulesScheduleRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubscriptionSchedulesScheduleRequestResult> {
  return requestHandler.execute(
    createRequest(getSubscriptionSchedulesScheduleEndpointSchema, payload),
    config
  );
}

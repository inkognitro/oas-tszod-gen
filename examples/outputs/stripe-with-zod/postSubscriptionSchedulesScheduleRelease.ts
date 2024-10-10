import {
  z_Subscription_schedule,
  z_Error,
  Subscription_schedule,
  Error,
} from './schemas';
import {z} from 'zod';
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

export const postSubscriptionSchedulesScheduleReleaseEndpointSchema = {
  path: '/v1/subscription_schedules/{schedule}/release',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    schedule: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        preserve_cancel_date: z.boolean().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Subscription_schedule,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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

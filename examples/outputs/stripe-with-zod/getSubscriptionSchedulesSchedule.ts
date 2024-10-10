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

export const getSubscriptionSchedulesScheduleEndpointSchema = {
  path: '/v1/subscription_schedules/{schedule}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    schedule: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
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

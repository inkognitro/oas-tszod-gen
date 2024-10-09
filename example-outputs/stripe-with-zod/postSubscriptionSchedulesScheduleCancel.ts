import {
  z_Subscription_schedule,
  z_Error,
  Subscription_schedule,
  Error,
} from '@example-outputs/stripe-with-zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const postSubscriptionSchedulesScheduleCancelEndpointSchema = {
  path: '/v1/subscription_schedules/{schedule}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    schedule: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        invoice_now: z.boolean().optional(),
        prorate: z.boolean().optional(),
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

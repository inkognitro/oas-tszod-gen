import {z_Subscription, z_Error, Subscription, Error} from './schemas';
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

export const deleteSubscriptionsSubscriptionExposedIdEndpointSchema = {
  path: '/v1/subscriptions/{subscription_exposed_id}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    subscription_exposed_id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        cancellation_details: z
          .object({
            comment: z.union([z.string(), z.enum([''])]).optional(),
            feedback: z
              .enum([
                '',
                'customer_service',
                'low_quality',
                'missing_features',
                'other',
                'switched_service',
                'too_complex',
                'too_expensive',
                'unused',
              ])
              .optional(),
          })
          .optional(),
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
          zodSchema: z_Subscription,
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

export type DeleteSubscriptionsSubscriptionExposedIdRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      cancellation_details?: {
        comment?: string | '';
        feedback?:
          | ''
          | 'customer_service'
          | 'low_quality'
          | 'missing_features'
          | 'other'
          | 'switched_service'
          | 'too_complex'
          | 'too_expensive'
          | 'unused';
      };
      expand?: string[];
      invoice_now?: boolean;
      prorate?: boolean;
    }
  >,
  {
    subscription_exposed_id: string;
  }
>;

export type DeleteSubscriptionsSubscriptionExposedIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteSubscriptionsSubscriptionExposedIdRequestResult =
  RequestResult<
    DeleteSubscriptionsSubscriptionExposedIdRequest,
    DeleteSubscriptionsSubscriptionExposedIdResponse
  >;

export function deleteSubscriptionsSubscriptionExposedId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteSubscriptionsSubscriptionExposedIdRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSubscriptionsSubscriptionExposedIdRequestResult> {
  return requestHandler.execute(
    createRequest(
      deleteSubscriptionsSubscriptionExposedIdEndpointSchema,
      payload
    ),
    config
  );
}

import {
  z_Setup_intent,
  z_Error,
  Setup_intent,
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

export const postSetupIntentsIntentCancelEndpointSchema = {
  path: '/v1/setup_intents/{intent}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    intent: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        cancellation_reason: z
          .enum(['abandoned', 'duplicate', 'requested_by_customer'])
          .optional(),
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Setup_intent,
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

export type PostSetupIntentsIntentCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      cancellation_reason?: 'abandoned' | 'duplicate' | 'requested_by_customer';
      expand?: string[];
    }
  >,
  {
    intent: string;
  }
>;

export type PostSetupIntentsIntentCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Setup_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSetupIntentsIntentCancelRequestResult = RequestResult<
  PostSetupIntentsIntentCancelRequest,
  PostSetupIntentsIntentCancelResponse
>;

export function postSetupIntentsIntentCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSetupIntentsIntentCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSetupIntentsIntentCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postSetupIntentsIntentCancelEndpointSchema, payload),
    config
  );
}

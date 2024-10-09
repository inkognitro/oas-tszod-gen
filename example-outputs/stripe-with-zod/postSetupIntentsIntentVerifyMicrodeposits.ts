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

export const postSetupIntentsIntentVerifyMicrodepositsEndpointSchema = {
  path: '/v1/setup_intents/{intent}/verify_microdeposits',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    intent: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amounts: z.array(z.number().int().safe().finite()).optional(),
        client_secret: z.string().optional(),
        descriptor_code: z.string().optional(),
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

export type PostSetupIntentsIntentVerifyMicrodepositsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amounts?: number[]; // item: int
      client_secret?: string;
      descriptor_code?: string;
      expand?: string[];
    }
  >,
  {
    intent: string;
  }
>;

export type PostSetupIntentsIntentVerifyMicrodepositsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Setup_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSetupIntentsIntentVerifyMicrodepositsRequestResult =
  RequestResult<
    PostSetupIntentsIntentVerifyMicrodepositsRequest,
    PostSetupIntentsIntentVerifyMicrodepositsResponse
  >;

export function postSetupIntentsIntentVerifyMicrodeposits(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSetupIntentsIntentVerifyMicrodepositsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSetupIntentsIntentVerifyMicrodepositsRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSetupIntentsIntentVerifyMicrodepositsEndpointSchema,
      payload
    ),
    config
  );
}

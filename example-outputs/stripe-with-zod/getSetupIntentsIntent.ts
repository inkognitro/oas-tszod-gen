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

export const getSetupIntentsIntentEndpointSchema = {
  path: '/v1/setup_intents/{intent}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    client_secret: z.string().optional(),
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    intent: z.string(),
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

export type GetSetupIntentsIntentRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    intent: string;
  },
  {
    client_secret?: string;
    expand?: string[];
  }
>;

export type GetSetupIntentsIntentResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Setup_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSetupIntentsIntentRequestResult = RequestResult<
  GetSetupIntentsIntentRequest,
  GetSetupIntentsIntentResponse
>;

export function getSetupIntentsIntent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSetupIntentsIntentRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSetupIntentsIntentRequestResult> {
  return requestHandler.execute(
    createRequest(getSetupIntentsIntentEndpointSchema, payload),
    config
  );
}

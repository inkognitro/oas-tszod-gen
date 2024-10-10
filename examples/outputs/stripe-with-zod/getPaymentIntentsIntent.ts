import {z_Payment_intent, z_Error, Payment_intent, Error} from './schemas';
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

export const getPaymentIntentsIntentEndpointSchema = {
  path: '/v1/payment_intents/{intent}',
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
          zodSchema: z_Payment_intent,
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

export type GetPaymentIntentsIntentRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    intent: string;
  },
  {
    client_secret?: string;
    expand?: string[];
  }
>;

export type GetPaymentIntentsIntentResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Payment_intent>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentIntentsIntentRequestResult = RequestResult<
  GetPaymentIntentsIntentRequest,
  GetPaymentIntentsIntentResponse
>;

export function getPaymentIntentsIntent(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentIntentsIntentRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentIntentsIntentRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentIntentsIntentEndpointSchema, payload),
    config
  );
}

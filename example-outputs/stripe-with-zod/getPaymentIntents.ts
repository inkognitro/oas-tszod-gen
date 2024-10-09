import {
  z_Payment_intent,
  z_Error,
  Payment_intent,
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

export const getPaymentIntentsEndpointSchema = {
  path: '/v1/payment_intents',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    created: z
      .union([
        z.object({
          gt: z.number().int().safe().finite().optional(),
          gte: z.number().int().safe().finite().optional(),
          lt: z.number().int().safe().finite().optional(),
          lte: z.number().int().safe().finite().optional(),
        }),
        z.number().int().safe().finite(),
      ])
      .optional(),
    customer: z.string().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
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
          zodSchema: z.object({
            data: z.array(z_Payment_intent),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/payment_intents/),
          }),
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

export type GetPaymentIntentsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    customer?: string;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetPaymentIntentsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Payment_intent[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentIntentsRequestResult = RequestResult<
  GetPaymentIntentsRequest,
  GetPaymentIntentsResponse
>;

export function getPaymentIntents(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentIntentsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentIntentsRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentIntentsEndpointSchema, payload),
    config
  );
}

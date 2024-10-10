import {z_Checkout_Session, Checkout_Session} from './checkout';
import {z_Error, Error} from './schemas';
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

export const getCheckoutSessionsEndpointSchema = {
  path: '/v1/checkout/sessions',
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
    customer_details: z
      .object({
        email: z.string(),
      })
      .optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    payment_intent: z.string().optional(),
    payment_link: z.string().optional(),
    starting_after: z.string().optional(),
    status: z.enum(['complete', 'expired', 'open']).optional(),
    subscription: z.string().optional(),
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
            data: z.array(z_Checkout_Session),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string(),
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

export type GetCheckoutSessionsRequest = RequestUnion<
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
    customer_details?: {
      email: string;
    };
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    payment_intent?: string;
    payment_link?: string;
    starting_after?: string;
    status?: 'complete' | 'expired' | 'open';
    subscription?: string;
  }
>;

export type GetCheckoutSessionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Checkout_Session[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCheckoutSessionsRequestResult = RequestResult<
  GetCheckoutSessionsRequest,
  GetCheckoutSessionsResponse
>;

export function getCheckoutSessions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCheckoutSessionsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCheckoutSessionsRequestResult> {
  return requestHandler.execute(
    createRequest(getCheckoutSessionsEndpointSchema, payload),
    config
  );
}

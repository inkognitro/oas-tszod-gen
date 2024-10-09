import {
  z_Subscription_item,
  z_Error,
  Subscription_item,
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

export const getSubscriptionItemsEndpointSchema = {
  path: '/v1/subscription_items',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
    subscription: z.string(),
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
            data: z.array(z_Subscription_item),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/subscription_items/),
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

export type GetSubscriptionItemsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
    subscription: string;
  }
>;

export type GetSubscriptionItemsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Subscription_item[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSubscriptionItemsRequestResult = RequestResult<
  GetSubscriptionItemsRequest,
  GetSubscriptionItemsResponse
>;

export function getSubscriptionItems(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSubscriptionItemsRequest,
    'queryParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubscriptionItemsRequestResult> {
  return requestHandler.execute(
    createRequest(getSubscriptionItemsEndpointSchema, payload),
    config
  );
}

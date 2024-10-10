import {
  z_Deleted_subscription_item,
  z_Error,
  Deleted_subscription_item,
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

export const deleteSubscriptionItemsItemEndpointSchema = {
  path: '/v1/subscription_items/{item}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    item: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        clear_usage: z.boolean().optional(),
        proration_behavior: z
          .enum(['always_invoice', 'create_prorations', 'none'])
          .optional(),
        proration_date: z.number().int().safe().finite().optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Deleted_subscription_item,
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

export type DeleteSubscriptionItemsItemRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      clear_usage?: boolean;
      proration_behavior?: 'always_invoice' | 'create_prorations' | 'none';
      proration_date?: number; // int
    }
  >,
  {
    item: string;
  }
>;

export type DeleteSubscriptionItemsItemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_subscription_item>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteSubscriptionItemsItemRequestResult = RequestResult<
  DeleteSubscriptionItemsItemRequest,
  DeleteSubscriptionItemsItemResponse
>;

export function deleteSubscriptionItemsItem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteSubscriptionItemsItemRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSubscriptionItemsItemRequestResult> {
  return requestHandler.execute(
    createRequest(deleteSubscriptionItemsItemEndpointSchema, payload),
    config
  );
}

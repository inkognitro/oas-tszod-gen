import {
  z_Subscription_item,
  z_Error,
  Subscription_item,
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

export const getSubscriptionItemsItemEndpointSchema = {
  path: '/v1/subscription_items/{item}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    item: z.string(),
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
          zodSchema: z_Subscription_item,
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

export type GetSubscriptionItemsItemRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    item: string;
  },
  {
    expand?: string[];
  }
>;

export type GetSubscriptionItemsItemResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Subscription_item>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSubscriptionItemsItemRequestResult = RequestResult<
  GetSubscriptionItemsItemRequest,
  GetSubscriptionItemsItemResponse
>;

export function getSubscriptionItemsItem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSubscriptionItemsItemRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubscriptionItemsItemRequestResult> {
  return requestHandler.execute(
    createRequest(getSubscriptionItemsItemEndpointSchema, payload),
    config
  );
}

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
import {Deleted_subscription_item, Error} from './schemas';

export const deleteSubscriptionItemsItemEndpointSchema = {
  path: '/v1/subscription_items/{item}',
  method: 'delete',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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

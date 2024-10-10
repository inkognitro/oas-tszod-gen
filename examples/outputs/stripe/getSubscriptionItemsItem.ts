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
import {Subscription_item, Error} from './schemas';

export const getSubscriptionItemsItemEndpointSchema = {
  path: '/v1/subscription_items/{item}',
  method: 'get',
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

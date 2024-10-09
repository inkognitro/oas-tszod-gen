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
} from '@example-outputs/stripe/core';
import {Usage_record, Error} from '@example-outputs/stripe';

export const postSubscriptionItemsSubscriptionItemUsageRecordsEndpointSchema = {
  path: '/v1/subscription_items/{subscription_item}/usage_records',
  method: 'post',
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

export type PostSubscriptionItemsSubscriptionItemUsageRecordsRequest =
  RequestUnion<
    RequestBodyData<
      'application/x-www-form-urlencoded',
      {
        action?: 'increment' | 'set';
        expand?: string[];
        quantity: number; // int
        timestamp?: 'now' | number;
      }
    >,
    {
      subscription_item: string;
    }
  >;

export type PostSubscriptionItemsSubscriptionItemUsageRecordsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Usage_record>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostSubscriptionItemsSubscriptionItemUsageRecordsRequestResult =
  RequestResult<
    PostSubscriptionItemsSubscriptionItemUsageRecordsRequest,
    PostSubscriptionItemsSubscriptionItemUsageRecordsResponse
  >;

export function postSubscriptionItemsSubscriptionItemUsageRecords(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSubscriptionItemsSubscriptionItemUsageRecordsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscriptionItemsSubscriptionItemUsageRecordsRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSubscriptionItemsSubscriptionItemUsageRecordsEndpointSchema,
      payload
    ),
    config
  );
}

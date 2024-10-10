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
import {Usage_record_summary, Error} from './schemas';

export const getSubscriptionItemsSubscriptionItemUsageRecordSummariesEndpointSchema =
  {
    path: '/v1/subscription_items/{subscription_item}/usage_record_summaries',
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

export type GetSubscriptionItemsSubscriptionItemUsageRecordSummariesRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      subscription_item: string;
    },
    {
      ending_before?: string;
      expand?: string[];
      limit?: number; // int
      starting_after?: string;
    }
  >;

export type GetSubscriptionItemsSubscriptionItemUsageRecordSummariesResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Usage_record_summary[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSubscriptionItemsSubscriptionItemUsageRecordSummariesRequestResult =
  RequestResult<
    GetSubscriptionItemsSubscriptionItemUsageRecordSummariesRequest,
    GetSubscriptionItemsSubscriptionItemUsageRecordSummariesResponse
  >;

export function getSubscriptionItemsSubscriptionItemUsageRecordSummaries(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSubscriptionItemsSubscriptionItemUsageRecordSummariesRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSubscriptionItemsSubscriptionItemUsageRecordSummariesRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSubscriptionItemsSubscriptionItemUsageRecordSummariesEndpointSchema,
      payload
    ),
    config
  );
}

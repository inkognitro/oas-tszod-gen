import {
  z_Usage_record_summary,
  z_Error,
  Usage_record_summary,
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

export const getSubscriptionItemsSubscriptionItemUsageRecordSummariesEndpointSchema =
  {
    path: '/v1/subscription_items/{subscription_item}/usage_record_summaries',
    method: 'get',
    supportedSecuritySchemas: [],
    queryParamsZodSchema: z.object({
      ending_before: z.string().optional(),
      expand: z.array(z.string()).optional(),
      limit: z.number().int().safe().finite().optional(),
      starting_after: z.string().optional(),
    }),
    pathParamsZodSchema: z.object({
      subscription_item: z.string(),
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
              data: z.array(z_Usage_record_summary),
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

import {z_Usage_record, z_Error, Usage_record, Error} from './schemas';
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

export const postSubscriptionItemsSubscriptionItemUsageRecordsEndpointSchema = {
  path: '/v1/subscription_items/{subscription_item}/usage_records',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    subscription_item: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        action: z.enum(['increment', 'set']).optional(),
        expand: z.array(z.string()).optional(),
        quantity: z.number().int().safe().finite(),
        timestamp: z
          .union([z.enum(['now']), z.number().int().safe().finite()])
          .optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Usage_record,
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

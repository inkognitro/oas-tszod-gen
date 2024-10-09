import {
  z_Subscription,
  z_Error,
  Subscription,
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

export const getCustomersCustomerSubscriptionsEndpointSchema = {
  path: '/v1/customers/{customer}/subscriptions',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
  }),
  pathParamsZodSchema: z.object({
    customer: z.string(),
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
            data: z.array(z_Subscription),
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

export type GetCustomersCustomerSubscriptionsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    customer: string;
  },
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetCustomersCustomerSubscriptionsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Subscription[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetCustomersCustomerSubscriptionsRequestResult = RequestResult<
  GetCustomersCustomerSubscriptionsRequest,
  GetCustomersCustomerSubscriptionsResponse
>;

export function getCustomersCustomerSubscriptions(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetCustomersCustomerSubscriptionsRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetCustomersCustomerSubscriptionsRequestResult> {
  return requestHandler.execute(
    createRequest(getCustomersCustomerSubscriptionsEndpointSchema, payload),
    config
  );
}

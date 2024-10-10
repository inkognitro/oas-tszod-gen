import {z_Climate_Order, Climate_Order} from './climate';
import {z_Error, Error} from './schemas';
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

export const postClimateOrdersEndpointSchema = {
  path: '/v1/climate/orders',
  method: 'post',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        amount: z.number().int().safe().finite().optional(),
        beneficiary: z
          .object({
            public_name: z.string(),
          })
          .optional(),
        currency: z.string().optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
        metric_tons: z.string().optional(),
        product: z.string(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Climate_Order,
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

export type PostClimateOrdersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      beneficiary?: {
        public_name: string;
      };
      currency?: string;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
      metric_tons?: string; // decimal
      product: string;
    }
  >
>;

export type PostClimateOrdersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Order>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostClimateOrdersRequestResult = RequestResult<
  PostClimateOrdersRequest,
  PostClimateOrdersResponse
>;

export function postClimateOrders(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostClimateOrdersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostClimateOrdersRequestResult> {
  return requestHandler.execute(
    createRequest(postClimateOrdersEndpointSchema, payload),
    config
  );
}

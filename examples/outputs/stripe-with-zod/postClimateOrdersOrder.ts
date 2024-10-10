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

export const postClimateOrdersOrderEndpointSchema = {
  path: '/v1/climate/orders/{order}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    order: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        beneficiary: z
          .union([
            z.object({
              public_name: z.union([z.string(), z.enum([''])]),
            }),
            z.enum(['']),
          ])
          .optional(),
        expand: z.array(z.string()).optional(),
        metadata: z.record(z.string()).optional(),
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

export type PostClimateOrdersOrderRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      beneficiary?: (
        | {
            public_name: string | '';
          }
        | ''
      ) &
        Partial<{
          public_name: string | '';
        }>;
      expand?: string[];
      metadata?: {
        [key: string]: string;
      };
    }
  >,
  {
    order: string;
  }
>;

export type PostClimateOrdersOrderResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Order>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostClimateOrdersOrderRequestResult = RequestResult<
  PostClimateOrdersOrderRequest,
  PostClimateOrdersOrderResponse
>;

export function postClimateOrdersOrder(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostClimateOrdersOrderRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostClimateOrdersOrderRequestResult> {
  return requestHandler.execute(
    createRequest(postClimateOrdersOrderEndpointSchema, payload),
    config
  );
}

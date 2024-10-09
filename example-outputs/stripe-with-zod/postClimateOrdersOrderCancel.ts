import {
  z_Climate_Order,
  z_Error,
  Climate_Order,
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

export const postClimateOrdersOrderCancelEndpointSchema = {
  path: '/v1/climate/orders/{order}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    order: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
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

export type PostClimateOrdersOrderCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    order: string;
  }
>;

export type PostClimateOrdersOrderCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Climate_Order>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostClimateOrdersOrderCancelRequestResult = RequestResult<
  PostClimateOrdersOrderCancelRequest,
  PostClimateOrdersOrderCancelResponse
>;

export function postClimateOrdersOrderCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostClimateOrdersOrderCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostClimateOrdersOrderCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postClimateOrdersOrderCancelEndpointSchema, payload),
    config
  );
}

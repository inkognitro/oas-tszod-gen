import {
  z_Refund,
  z_Error,
  Refund,
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

export const postRefundsRefundCancelEndpointSchema = {
  path: '/v1/refunds/{refund}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    refund: z.string(),
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
          zodSchema: z_Refund,
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

export type PostRefundsRefundCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    refund: string;
  }
>;

export type PostRefundsRefundCancelResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostRefundsRefundCancelRequestResult = RequestResult<
  PostRefundsRefundCancelRequest,
  PostRefundsRefundCancelResponse
>;

export function postRefundsRefundCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostRefundsRefundCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostRefundsRefundCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postRefundsRefundCancelEndpointSchema, payload),
    config
  );
}

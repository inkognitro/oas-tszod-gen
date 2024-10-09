import {
  z_Treasury_Outbound_payment,
  z_Error,
  Treasury_Outbound_payment,
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

export const postTreasuryOutboundPaymentsIdCancelEndpointSchema = {
  path: '/v1/treasury/outbound_payments/{id}/cancel',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
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
          zodSchema: z_Treasury_Outbound_payment,
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

export type PostTreasuryOutboundPaymentsIdCancelRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostTreasuryOutboundPaymentsIdCancelResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Treasury_Outbound_payment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostTreasuryOutboundPaymentsIdCancelRequestResult = RequestResult<
  PostTreasuryOutboundPaymentsIdCancelRequest,
  PostTreasuryOutboundPaymentsIdCancelResponse
>;

export function postTreasuryOutboundPaymentsIdCancel(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostTreasuryOutboundPaymentsIdCancelRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostTreasuryOutboundPaymentsIdCancelRequestResult> {
  return requestHandler.execute(
    createRequest(postTreasuryOutboundPaymentsIdCancelEndpointSchema, payload),
    config
  );
}

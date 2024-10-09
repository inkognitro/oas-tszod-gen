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

export const postChargesChargeRefundsRefundEndpointSchema = {
  path: '/v1/charges/{charge}/refunds/{refund}',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    charge: z.string(),
    refund: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
        metadata: z.union([z.record(z.string()), z.enum([''])]).optional(),
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

export type PostChargesChargeRefundsRefundRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
    }
  >,
  {
    charge: string;
    refund: string;
  }
>;

export type PostChargesChargeRefundsRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeRefundsRefundRequestResult = RequestResult<
  PostChargesChargeRefundsRefundRequest,
  PostChargesChargeRefundsRefundResponse
>;

export function postChargesChargeRefundsRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeRefundsRefundRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeRefundsRefundRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeRefundsRefundEndpointSchema, payload),
    config
  );
}

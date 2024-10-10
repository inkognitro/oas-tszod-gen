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
import {Charge, Error} from './schemas';

export const postChargesChargeRefundEndpointSchema = {
  path: '/v1/charges/{charge}/refund',
  method: 'post',
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

export type PostChargesChargeRefundRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      expand?: string[];
      instructions_email?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      payment_intent?: string;
      reason?: 'duplicate' | 'fraudulent' | 'requested_by_customer';
      refund_application_fee?: boolean;
      reverse_transfer?: boolean;
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeRefundResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Charge>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeRefundRequestResult = RequestResult<
  PostChargesChargeRefundRequest,
  PostChargesChargeRefundResponse
>;

export function postChargesChargeRefund(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeRefundRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeRefundRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeRefundEndpointSchema, payload),
    config
  );
}

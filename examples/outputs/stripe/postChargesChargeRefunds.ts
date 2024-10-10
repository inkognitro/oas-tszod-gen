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
import {Refund, Error} from './schemas';

export const postChargesChargeRefundsEndpointSchema = {
  path: '/v1/charges/{charge}/refunds',
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

export type PostChargesChargeRefundsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      currency?: string;
      customer?: string;
      expand?: string[];
      instructions_email?: string;
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      origin?: 'customer_balance';
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

export type PostChargesChargeRefundsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Refund>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeRefundsRequestResult = RequestResult<
  PostChargesChargeRefundsRequest,
  PostChargesChargeRefundsResponse
>;

export function postChargesChargeRefunds(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeRefundsRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeRefundsRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeRefundsEndpointSchema, payload),
    config
  );
}

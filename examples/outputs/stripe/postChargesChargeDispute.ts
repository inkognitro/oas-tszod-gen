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
import {Dispute, Error} from './schemas';

export const postChargesChargeDisputeEndpointSchema = {
  path: '/v1/charges/{charge}/dispute',
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

export type PostChargesChargeDisputeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      evidence?: {
        access_activity_log?: string;
        billing_address?: string;
        cancellation_policy?: string;
        cancellation_policy_disclosure?: string;
        cancellation_rebuttal?: string;
        customer_communication?: string;
        customer_email_address?: string;
        customer_name?: string;
        customer_purchase_ip?: string;
        customer_signature?: string;
        duplicate_charge_documentation?: string;
        duplicate_charge_explanation?: string;
        duplicate_charge_id?: string;
        product_description?: string;
        receipt?: string;
        refund_policy?: string;
        refund_policy_disclosure?: string;
        refund_refusal_explanation?: string;
        service_date?: string;
        service_documentation?: string;
        shipping_address?: string;
        shipping_carrier?: string;
        shipping_date?: string;
        shipping_documentation?: string;
        shipping_tracking_number?: string;
        uncategorized_file?: string;
        uncategorized_text?: string;
      };
      expand?: string[];
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      submit?: boolean;
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeDisputeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Dispute>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeDisputeRequestResult = RequestResult<
  PostChargesChargeDisputeRequest,
  PostChargesChargeDisputeResponse
>;

export function postChargesChargeDispute(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeDisputeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeDisputeRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeDisputeEndpointSchema, payload),
    config
  );
}

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
} from '@example-outputs/stripe/core';
import {Charge, Error} from '@example-outputs/stripe';

export const postChargesChargeEndpointSchema = {
  path: '/v1/charges/{charge}',
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

export type PostChargesChargeRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      customer?: string;
      description?: string;
      expand?: string[];
      fraud_details?: {
        user_report: '' | 'fraudulent' | 'safe';
      };
      metadata?:
        | {
            [key: string]: string;
          }
        | '';
      receipt_email?: string;
      shipping?: {
        address: {
          city?: string;
          country?: string;
          line1?: string;
          line2?: string;
          postal_code?: string;
          state?: string;
        };
        carrier?: string;
        name: string;
        phone?: string;
        tracking_number?: string;
      };
      transfer_group?: string;
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Charge>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeRequestResult = RequestResult<
  PostChargesChargeRequest,
  PostChargesChargeResponse
>;

export function postChargesCharge(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeEndpointSchema, payload),
    config
  );
}

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

export const postChargesChargeCaptureEndpointSchema = {
  path: '/v1/charges/{charge}/capture',
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

export type PostChargesChargeCaptureRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      amount?: number; // int
      application_fee?: number; // int
      application_fee_amount?: number; // int
      expand?: string[];
      receipt_email?: string;
      statement_descriptor?: string;
      statement_descriptor_suffix?: string;
      transfer_data?: {
        amount?: number; // int
      };
      transfer_group?: string;
    }
  >,
  {
    charge: string;
  }
>;

export type PostChargesChargeCaptureResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Charge>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostChargesChargeCaptureRequestResult = RequestResult<
  PostChargesChargeCaptureRequest,
  PostChargesChargeCaptureResponse
>;

export function postChargesChargeCapture(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostChargesChargeCaptureRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostChargesChargeCaptureRequestResult> {
  return requestHandler.execute(
    createRequest(postChargesChargeCaptureEndpointSchema, payload),
    config
  );
}

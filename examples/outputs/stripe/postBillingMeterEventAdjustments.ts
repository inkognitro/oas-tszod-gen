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
import {Billing_Meter_event_adjustment} from './billing';
import {Error} from './schemas';

export const postBillingMeterEventAdjustmentsEndpointSchema = {
  path: '/v1/billing/meter_event_adjustments',
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

export type PostBillingMeterEventAdjustmentsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      cancel?: {
        identifier?: string;
      };
      event_name: string;
      expand?: string[];
      type: 'cancel';
    }
  >
>;

export type PostBillingMeterEventAdjustmentsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Billing_Meter_event_adjustment>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMeterEventAdjustmentsRequestResult = RequestResult<
  PostBillingMeterEventAdjustmentsRequest,
  PostBillingMeterEventAdjustmentsResponse
>;

export function postBillingMeterEventAdjustments(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMeterEventAdjustmentsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMeterEventAdjustmentsRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMeterEventAdjustmentsEndpointSchema, payload),
    config
  );
}

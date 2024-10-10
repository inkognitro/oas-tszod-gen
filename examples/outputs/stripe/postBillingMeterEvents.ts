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
import {Billing_Meter_event} from './billing';
import {Error} from './schemas';

export const postBillingMeterEventsEndpointSchema = {
  path: '/v1/billing/meter_events',
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

export type PostBillingMeterEventsRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      event_name: string;
      expand?: string[];
      identifier?: string;
      payload: {
        [key: string]: string;
      };
      timestamp?: number; // int
    }
  >
>;

export type PostBillingMeterEventsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Billing_Meter_event>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMeterEventsRequestResult = RequestResult<
  PostBillingMeterEventsRequest,
  PostBillingMeterEventsResponse
>;

export function postBillingMeterEvents(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMeterEventsRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMeterEventsRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMeterEventsEndpointSchema, payload),
    config
  );
}

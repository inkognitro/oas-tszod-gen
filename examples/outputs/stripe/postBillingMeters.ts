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
import {Billing_Meter} from './billing';
import {Error} from './schemas';

export const postBillingMetersEndpointSchema = {
  path: '/v1/billing/meters',
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

export type PostBillingMetersRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      customer_mapping?: {
        event_payload_key: string;
        type: 'by_id';
      };
      default_aggregation: {
        formula: 'count' | 'sum';
      };
      display_name: string;
      event_name: string;
      event_time_window?: 'day' | 'hour';
      expand?: string[];
      value_settings?: {
        event_payload_key: string;
      };
    }
  >
>;

export type PostBillingMetersResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Meter>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingMetersRequestResult = RequestResult<
  PostBillingMetersRequest,
  PostBillingMetersResponse
>;

export function postBillingMeters(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingMetersRequest,
    'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingMetersRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingMetersEndpointSchema, payload),
    config
  );
}

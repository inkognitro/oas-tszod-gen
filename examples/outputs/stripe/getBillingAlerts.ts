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
import {Billing_Alert} from './billing';
import {Error} from './schemas';

export const getBillingAlertsEndpointSchema = {
  path: '/v1/billing/alerts',
  method: 'get',
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

export type GetBillingAlertsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    alert_type?: 'usage_threshold';
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    meter?: string;
    starting_after?: string;
  }
>;

export type GetBillingAlertsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Billing_Alert[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBillingAlertsRequestResult = RequestResult<
  GetBillingAlertsRequest,
  GetBillingAlertsResponse
>;

export function getBillingAlerts(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBillingAlertsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBillingAlertsRequestResult> {
  return requestHandler.execute(
    createRequest(getBillingAlertsEndpointSchema, payload),
    config
  );
}

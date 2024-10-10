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

export const postBillingAlertsIdActivateEndpointSchema = {
  path: '/v1/billing/alerts/{id}/activate',
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

export type PostBillingAlertsIdActivateRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    id: string;
  }
>;

export type PostBillingAlertsIdActivateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Alert>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingAlertsIdActivateRequestResult = RequestResult<
  PostBillingAlertsIdActivateRequest,
  PostBillingAlertsIdActivateResponse
>;

export function postBillingAlertsIdActivate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingAlertsIdActivateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingAlertsIdActivateRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingAlertsIdActivateEndpointSchema, payload),
    config
  );
}

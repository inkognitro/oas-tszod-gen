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

export const postBillingAlertsIdDeactivateEndpointSchema = {
  path: '/v1/billing/alerts/{id}/deactivate',
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

export type PostBillingAlertsIdDeactivateRequest = RequestUnion<
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

export type PostBillingAlertsIdDeactivateResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Alert>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingAlertsIdDeactivateRequestResult = RequestResult<
  PostBillingAlertsIdDeactivateRequest,
  PostBillingAlertsIdDeactivateResponse
>;

export function postBillingAlertsIdDeactivate(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingAlertsIdDeactivateRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingAlertsIdDeactivateRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingAlertsIdDeactivateEndpointSchema, payload),
    config
  );
}

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
import {Billing_Alert, Error} from '@example-outputs/stripe';

export const getBillingAlertsIdEndpointSchema = {
  path: '/v1/billing/alerts/{id}',
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

export type GetBillingAlertsIdRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    id: string;
  },
  {
    expand?: string[];
  }
>;

export type GetBillingAlertsIdResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Alert>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBillingAlertsIdRequestResult = RequestResult<
  GetBillingAlertsIdRequest,
  GetBillingAlertsIdResponse
>;

export function getBillingAlertsId(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBillingAlertsIdRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBillingAlertsIdRequestResult> {
  return requestHandler.execute(
    createRequest(getBillingAlertsIdEndpointSchema, payload),
    config
  );
}

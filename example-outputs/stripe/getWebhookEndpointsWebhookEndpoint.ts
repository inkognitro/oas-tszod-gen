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
import {Webhook_endpoint, Error} from '@example-outputs/stripe';

export const getWebhookEndpointsWebhookEndpointEndpointSchema = {
  path: '/v1/webhook_endpoints/{webhook_endpoint}',
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

export type GetWebhookEndpointsWebhookEndpointRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    webhook_endpoint: string;
  },
  {
    expand?: string[];
  }
>;

export type GetWebhookEndpointsWebhookEndpointResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Webhook_endpoint>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetWebhookEndpointsWebhookEndpointRequestResult = RequestResult<
  GetWebhookEndpointsWebhookEndpointRequest,
  GetWebhookEndpointsWebhookEndpointResponse
>;

export function getWebhookEndpointsWebhookEndpoint(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetWebhookEndpointsWebhookEndpointRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetWebhookEndpointsWebhookEndpointRequestResult> {
  return requestHandler.execute(
    createRequest(getWebhookEndpointsWebhookEndpointEndpointSchema, payload),
    config
  );
}

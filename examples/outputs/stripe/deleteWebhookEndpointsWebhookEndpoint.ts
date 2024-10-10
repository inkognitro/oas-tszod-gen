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
import {Deleted_webhook_endpoint, Error} from './schemas';

export const deleteWebhookEndpointsWebhookEndpointEndpointSchema = {
  path: '/v1/webhook_endpoints/{webhook_endpoint}',
  method: 'delete',
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

export type DeleteWebhookEndpointsWebhookEndpointRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    webhook_endpoint: string;
  }
>;

export type DeleteWebhookEndpointsWebhookEndpointResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Deleted_webhook_endpoint>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteWebhookEndpointsWebhookEndpointRequestResult = RequestResult<
  DeleteWebhookEndpointsWebhookEndpointRequest,
  DeleteWebhookEndpointsWebhookEndpointResponse
>;

export function deleteWebhookEndpointsWebhookEndpoint(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteWebhookEndpointsWebhookEndpointRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteWebhookEndpointsWebhookEndpointRequestResult> {
  return requestHandler.execute(
    createRequest(deleteWebhookEndpointsWebhookEndpointEndpointSchema, payload),
    config
  );
}

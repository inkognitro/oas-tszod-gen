import {
  z_Deleted_webhook_endpoint,
  z_Error,
  Deleted_webhook_endpoint,
  Error,
} from '@example-outputs/stripe-with-zod';
import {z} from 'zod';
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
} from '@example-outputs/stripe-with-zod/core';

export const deleteWebhookEndpointsWebhookEndpointEndpointSchema = {
  path: '/v1/webhook_endpoints/{webhook_endpoint}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    webhook_endpoint: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({}),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Deleted_webhook_endpoint,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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

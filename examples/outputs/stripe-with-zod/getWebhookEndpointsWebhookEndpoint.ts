import {z_Webhook_endpoint, z_Error, Webhook_endpoint, Error} from './schemas';
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
} from './core';

export const getWebhookEndpointsWebhookEndpointEndpointSchema = {
  path: '/v1/webhook_endpoints/{webhook_endpoint}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
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
          zodSchema: z_Webhook_endpoint,
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

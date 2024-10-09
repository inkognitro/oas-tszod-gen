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

export const getWebhookEndpointsEndpointSchema = {
  path: '/v1/webhook_endpoints',
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

export type GetWebhookEndpointsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetWebhookEndpointsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Webhook_endpoint[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetWebhookEndpointsRequestResult = RequestResult<
  GetWebhookEndpointsRequest,
  GetWebhookEndpointsResponse
>;

export function getWebhookEndpoints(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetWebhookEndpointsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetWebhookEndpointsRequestResult> {
  return requestHandler.execute(
    createRequest(getWebhookEndpointsEndpointSchema, payload),
    config
  );
}

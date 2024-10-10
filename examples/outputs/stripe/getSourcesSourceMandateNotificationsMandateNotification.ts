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
import {Source_mandate_notification, Error} from './schemas';

export const getSourcesSourceMandateNotificationsMandateNotificationEndpointSchema =
  {
    path: '/v1/sources/{source}/mandate_notifications/{mandate_notification}',
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

export type GetSourcesSourceMandateNotificationsMandateNotificationRequest =
  RequestUnion<
    RequestBodyData<'application/x-www-form-urlencoded', {}>,
    {
      mandate_notification: string;
      source: string;
    },
    {
      expand?: string[];
    }
  >;

export type GetSourcesSourceMandateNotificationsMandateNotificationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Source_mandate_notification>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetSourcesSourceMandateNotificationsMandateNotificationRequestResult =
  RequestResult<
    GetSourcesSourceMandateNotificationsMandateNotificationRequest,
    GetSourcesSourceMandateNotificationsMandateNotificationResponse
  >;

export function getSourcesSourceMandateNotificationsMandateNotification(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSourcesSourceMandateNotificationsMandateNotificationRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSourcesSourceMandateNotificationsMandateNotificationRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSourcesSourceMandateNotificationsMandateNotificationEndpointSchema,
      payload
    ),
    config
  );
}

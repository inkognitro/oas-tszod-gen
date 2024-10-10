import {
  z_Source_mandate_notification,
  z_Error,
  Source_mandate_notification,
  Error,
} from './schemas';
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

export const getSourcesSourceMandateNotificationsMandateNotificationEndpointSchema =
  {
    path: '/v1/sources/{source}/mandate_notifications/{mandate_notification}',
    method: 'get',
    supportedSecuritySchemas: [],
    queryParamsZodSchema: z.object({
      expand: z.array(z.string()).optional(),
    }),
    pathParamsZodSchema: z.object({
      mandate_notification: z.string(),
      source: z.string(),
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
            zodSchema: z_Source_mandate_notification,
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

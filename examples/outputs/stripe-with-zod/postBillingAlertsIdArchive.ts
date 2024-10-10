import {z_Billing_Alert, Billing_Alert} from './billing';
import {z_Error, Error} from './schemas';
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

export const postBillingAlertsIdArchiveEndpointSchema = {
  path: '/v1/billing/alerts/{id}/archive',
  method: 'post',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    id: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Billing_Alert,
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

export type PostBillingAlertsIdArchiveRequest = RequestUnion<
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

export type PostBillingAlertsIdArchiveResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Billing_Alert>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type PostBillingAlertsIdArchiveRequestResult = RequestResult<
  PostBillingAlertsIdArchiveRequest,
  PostBillingAlertsIdArchiveResponse
>;

export function postBillingAlertsIdArchive(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostBillingAlertsIdArchiveRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostBillingAlertsIdArchiveRequestResult> {
  return requestHandler.execute(
    createRequest(postBillingAlertsIdArchiveEndpointSchema, payload),
    config
  );
}

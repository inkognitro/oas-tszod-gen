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

export const getBillingAlertsIdEndpointSchema = {
  path: '/v1/billing/alerts/{id}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    id: z.string(),
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

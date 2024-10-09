import {
  z_Billing_portal_Configuration,
  z_Error,
  Billing_portal_Configuration,
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

export const getBillingPortalConfigurationsConfigurationEndpointSchema = {
  path: '/v1/billing_portal/configurations/{configuration}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    configuration: z.string(),
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
          zodSchema: z_Billing_portal_Configuration,
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

export type GetBillingPortalConfigurationsConfigurationRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    configuration: string;
  },
  {
    expand?: string[];
  }
>;

export type GetBillingPortalConfigurationsConfigurationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Billing_portal_Configuration>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBillingPortalConfigurationsConfigurationRequestResult =
  RequestResult<
    GetBillingPortalConfigurationsConfigurationRequest,
    GetBillingPortalConfigurationsConfigurationResponse
  >;

export function getBillingPortalConfigurationsConfiguration(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBillingPortalConfigurationsConfigurationRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBillingPortalConfigurationsConfigurationRequestResult> {
  return requestHandler.execute(
    createRequest(
      getBillingPortalConfigurationsConfigurationEndpointSchema,
      payload
    ),
    config
  );
}

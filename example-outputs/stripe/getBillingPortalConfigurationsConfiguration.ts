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
import {Billing_portal_Configuration, Error} from '@example-outputs/stripe';

export const getBillingPortalConfigurationsConfigurationEndpointSchema = {
  path: '/v1/billing_portal/configurations/{configuration}',
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

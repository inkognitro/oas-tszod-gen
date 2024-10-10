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
import {Billing_portal_Configuration} from './billing_portal';
import {Error} from './schemas';

export const getBillingPortalConfigurationsEndpointSchema = {
  path: '/v1/billing_portal/configurations',
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

export type GetBillingPortalConfigurationsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    active?: boolean;
    ending_before?: string;
    expand?: string[];
    is_default?: boolean;
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetBillingPortalConfigurationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Billing_portal_Configuration[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetBillingPortalConfigurationsRequestResult = RequestResult<
  GetBillingPortalConfigurationsRequest,
  GetBillingPortalConfigurationsResponse
>;

export function getBillingPortalConfigurations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetBillingPortalConfigurationsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetBillingPortalConfigurationsRequestResult> {
  return requestHandler.execute(
    createRequest(getBillingPortalConfigurationsEndpointSchema, payload),
    config
  );
}

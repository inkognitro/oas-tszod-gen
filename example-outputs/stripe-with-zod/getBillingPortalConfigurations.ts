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

export const getBillingPortalConfigurationsEndpointSchema = {
  path: '/v1/billing_portal/configurations',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    active: z.boolean().optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
    is_default: z.boolean().optional(),
    limit: z.number().int().safe().finite().optional(),
    starting_after: z.string().optional(),
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
          zodSchema: z.object({
            data: z.array(z_Billing_portal_Configuration),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/billing_portal\/configurations/),
          }),
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

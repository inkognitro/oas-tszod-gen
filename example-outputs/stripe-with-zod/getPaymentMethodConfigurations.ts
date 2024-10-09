import {
  z_Payment_method_configuration,
  z_Error,
  Payment_method_configuration,
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

export const getPaymentMethodConfigurationsEndpointSchema = {
  path: '/v1/payment_method_configurations',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    application: z.union([z.string(), z.enum([''])]).optional(),
    ending_before: z.string().optional(),
    expand: z.array(z.string()).optional(),
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
            data: z.array(z_Payment_method_configuration),
            has_more: z.boolean(),
            object: z.enum(['list']),
            url: z.string().regex(/\^\/v1\/payment_method_configurations/),
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

export type GetPaymentMethodConfigurationsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    application?: string | '';
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    starting_after?: string;
  }
>;

export type GetPaymentMethodConfigurationsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Payment_method_configuration[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentMethodConfigurationsRequestResult = RequestResult<
  GetPaymentMethodConfigurationsRequest,
  GetPaymentMethodConfigurationsResponse
>;

export function getPaymentMethodConfigurations(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentMethodConfigurationsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentMethodConfigurationsRequestResult> {
  return requestHandler.execute(
    createRequest(getPaymentMethodConfigurationsEndpointSchema, payload),
    config
  );
}

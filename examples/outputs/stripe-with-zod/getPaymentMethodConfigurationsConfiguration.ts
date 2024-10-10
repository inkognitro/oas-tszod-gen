import {
  z_Payment_method_configuration,
  z_Error,
  Payment_method_configuration,
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

export const getPaymentMethodConfigurationsConfigurationEndpointSchema = {
  path: '/v1/payment_method_configurations/{configuration}',
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
          zodSchema: z_Payment_method_configuration,
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

export type GetPaymentMethodConfigurationsConfigurationRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    configuration: string;
  },
  {
    expand?: string[];
  }
>;

export type GetPaymentMethodConfigurationsConfigurationResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Payment_method_configuration>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetPaymentMethodConfigurationsConfigurationRequestResult =
  RequestResult<
    GetPaymentMethodConfigurationsConfigurationRequest,
    GetPaymentMethodConfigurationsConfigurationResponse
  >;

export function getPaymentMethodConfigurationsConfiguration(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetPaymentMethodConfigurationsConfigurationRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetPaymentMethodConfigurationsConfigurationRequestResult> {
  return requestHandler.execute(
    createRequest(
      getPaymentMethodConfigurationsConfigurationEndpointSchema,
      payload
    ),
    config
  );
}

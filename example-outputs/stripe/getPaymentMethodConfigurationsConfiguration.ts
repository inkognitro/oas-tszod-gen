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
import {Payment_method_configuration, Error} from '@example-outputs/stripe';

export const getPaymentMethodConfigurationsConfigurationEndpointSchema = {
  path: '/v1/payment_method_configurations/{configuration}',
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

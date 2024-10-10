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
import {Payment_method_configuration, Error} from './schemas';

export const getPaymentMethodConfigurationsEndpointSchema = {
  path: '/v1/payment_method_configurations',
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

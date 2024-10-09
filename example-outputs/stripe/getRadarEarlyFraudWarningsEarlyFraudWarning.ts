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
import {Radar_Early_fraud_warning, Error} from '@example-outputs/stripe';

export const getRadarEarlyFraudWarningsEarlyFraudWarningEndpointSchema = {
  path: '/v1/radar/early_fraud_warnings/{early_fraud_warning}',
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

export type GetRadarEarlyFraudWarningsEarlyFraudWarningRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  {
    early_fraud_warning: string;
  },
  {
    expand?: string[];
  }
>;

export type GetRadarEarlyFraudWarningsEarlyFraudWarningResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<'application/json', Radar_Early_fraud_warning>
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetRadarEarlyFraudWarningsEarlyFraudWarningRequestResult =
  RequestResult<
    GetRadarEarlyFraudWarningsEarlyFraudWarningRequest,
    GetRadarEarlyFraudWarningsEarlyFraudWarningResponse
  >;

export function getRadarEarlyFraudWarningsEarlyFraudWarning(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetRadarEarlyFraudWarningsEarlyFraudWarningRequest,
    'pathParams' | 'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetRadarEarlyFraudWarningsEarlyFraudWarningRequestResult> {
  return requestHandler.execute(
    createRequest(
      getRadarEarlyFraudWarningsEarlyFraudWarningEndpointSchema,
      payload
    ),
    config
  );
}

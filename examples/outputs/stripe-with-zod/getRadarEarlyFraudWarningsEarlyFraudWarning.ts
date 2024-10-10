import {z_Radar_Early_fraud_warning, Radar_Early_fraud_warning} from './radar';
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

export const getRadarEarlyFraudWarningsEarlyFraudWarningEndpointSchema = {
  path: '/v1/radar/early_fraud_warnings/{early_fraud_warning}',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    expand: z.array(z.string()).optional(),
  }),
  pathParamsZodSchema: z.object({
    early_fraud_warning: z.string(),
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
          zodSchema: z_Radar_Early_fraud_warning,
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

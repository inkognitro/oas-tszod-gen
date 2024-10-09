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

export const getRadarEarlyFraudWarningsEndpointSchema = {
  path: '/v1/radar/early_fraud_warnings',
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

export type GetRadarEarlyFraudWarningsRequest = RequestUnion<
  RequestBodyData<'application/x-www-form-urlencoded', {}>,
  any,
  {
    charge?: string;
    created?: (
      | {
          gt?: number; // int
          gte?: number; // int
          lt?: number; // int
          lte?: number; // int
        }
      | number
    ) &
      Partial<{
        gt?: number; // int
        gte?: number; // int
        lt?: number; // int
        lte?: number; // int
      }>;
    ending_before?: string;
    expand?: string[];
    limit?: number; // int
    payment_intent?: string;
    starting_after?: string;
  }
>;

export type GetRadarEarlyFraudWarningsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          data: Radar_Early_fraud_warning[];
          has_more: boolean;
          object: 'list';
          url: string;
        }
      >
    >
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type GetRadarEarlyFraudWarningsRequestResult = RequestResult<
  GetRadarEarlyFraudWarningsRequest,
  GetRadarEarlyFraudWarningsResponse
>;

export function getRadarEarlyFraudWarnings(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetRadarEarlyFraudWarningsRequest,
    'contentType' | 'body',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetRadarEarlyFraudWarningsRequestResult> {
  return requestHandler.execute(
    createRequest(getRadarEarlyFraudWarningsEndpointSchema, payload),
    config
  );
}

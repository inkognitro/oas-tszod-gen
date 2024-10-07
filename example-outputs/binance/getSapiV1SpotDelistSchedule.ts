import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSapiV1SpotDelistScheduleEndpointSchema = {
  path: '/sapi/v1/spot/delist-schedule',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {},
      },
    },
  },
};

export type GetSapiV1SpotDelistScheduleRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1SpotDelistScheduleResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          delistTime: number; // int
          symbol: string[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SpotDelistScheduleRequestResult = RequestResult<
  GetSapiV1SpotDelistScheduleRequest,
  GetSapiV1SpotDelistScheduleResponse
>;

export function getSapiV1SpotDelistSchedule(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SpotDelistScheduleRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SpotDelistScheduleRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1SpotDelistScheduleEndpointSchema, payload),
    config
  );
}

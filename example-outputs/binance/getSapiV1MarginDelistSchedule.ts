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

export const getSapiV1MarginDelistScheduleEndpointSchema = {
  path: '/sapi/v1/margin/delist-schedule',
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

export type GetSapiV1MarginDelistScheduleRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1MarginDelistScheduleResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          delistTime?: number; // int
          crossMarginAssets?: string[];
          isolatedMarginSymbols?: string[];
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginDelistScheduleRequestResult = RequestResult<
  GetSapiV1MarginDelistScheduleRequest,
  GetSapiV1MarginDelistScheduleResponse
>;

export function getSapiV1MarginDelistSchedule(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1MarginDelistScheduleRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginDelistScheduleRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginDelistScheduleEndpointSchema, payload),
    config
  );
}

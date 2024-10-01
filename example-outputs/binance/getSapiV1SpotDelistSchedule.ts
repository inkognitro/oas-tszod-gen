import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

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

export type GetSapiV1SpotDelistSchedulePayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  GetSapiV1SpotDelistScheduleResponse
>;

export function getSapiV1SpotDelistSchedule(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SpotDelistSchedulePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SpotDelistScheduleRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SpotDelistScheduleEndpointSchema,
    }),
    config
  );
}

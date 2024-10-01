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

export type GetSapiV1MarginDelistSchedulePayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

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
  Request,
  GetSapiV1MarginDelistScheduleResponse
>;

export function getSapiV1MarginDelistSchedule(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginDelistSchedulePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginDelistScheduleRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginDelistScheduleEndpointSchema,
    }),
    config
  );
}

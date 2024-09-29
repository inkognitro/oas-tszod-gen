import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1BlvtSubscribeRecordEndpointSchema = {
  path: '/sapi/v1/blvt/subscribe/record',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type GetSapiV1BlvtSubscribeRecordPayload = {
  queryParams: {
    tokenName?: string;
    id?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1BlvtSubscribeRecordResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: number; // int
          tokenName: string;
          amount: string;
          nav: string;
          fee: string;
          totalCharge: string;
          timestamp: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1BlvtSubscribeRecordRequestResult = RequestResult<
  Request,
  GetSapiV1BlvtSubscribeRecordResponse
>;

export function getSapiV1BlvtSubscribeRecord(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1BlvtSubscribeRecordPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BlvtSubscribeRecordRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1BlvtSubscribeRecordEndpointSchema,
    }),
    config
  );
}

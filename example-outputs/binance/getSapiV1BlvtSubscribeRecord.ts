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

export const getSapiV1BlvtSubscribeRecordEndpointSchema = {
  path: '/sapi/v1/blvt/subscribe/record',
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

export type GetSapiV1BlvtSubscribeRecordRequest = RequestUnion<
  any,
  any,
  {
    tokenName?: string;
    id?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1BlvtSubscribeRecordResponse =
  | ResponseUnion<
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1BlvtSubscribeRecordRequestResult = RequestResult<
  GetSapiV1BlvtSubscribeRecordRequest,
  GetSapiV1BlvtSubscribeRecordResponse
>;

export function getSapiV1BlvtSubscribeRecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1BlvtSubscribeRecordRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BlvtSubscribeRecordRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1BlvtSubscribeRecordEndpointSchema, payload),
    config
  );
}

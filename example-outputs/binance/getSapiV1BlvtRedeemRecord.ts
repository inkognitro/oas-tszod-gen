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

export const getSapiV1BlvtRedeemRecordEndpointSchema = {
  path: '/sapi/v1/blvt/redeem/record',
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

export type GetSapiV1BlvtRedeemRecordRequest = RequestUnion<
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

export type GetSapiV1BlvtRedeemRecordResponse =
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
          netProceed: string;
          timestamp: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1BlvtRedeemRecordRequestResult = RequestResult<
  GetSapiV1BlvtRedeemRecordRequest,
  GetSapiV1BlvtRedeemRecordResponse
>;

export function getSapiV1BlvtRedeemRecord(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1BlvtRedeemRecordRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BlvtRedeemRecordRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1BlvtRedeemRecordEndpointSchema, payload),
    config
  );
}

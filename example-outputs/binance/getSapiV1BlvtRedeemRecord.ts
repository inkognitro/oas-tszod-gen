import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1BlvtRedeemRecordEndpointSchema = {
  path: '/sapi/v1/blvt/redeem/record',
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

export type GetSapiV1BlvtRedeemRecordPayload = {
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

export type GetSapiV1BlvtRedeemRecordResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1BlvtRedeemRecordRequestResult = RequestResult<
  Request,
  GetSapiV1BlvtRedeemRecordResponse
>;

export function getSapiV1BlvtRedeemRecord(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1BlvtRedeemRecordPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BlvtRedeemRecordRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1BlvtRedeemRecordEndpointSchema,
    }),
    config
  );
}

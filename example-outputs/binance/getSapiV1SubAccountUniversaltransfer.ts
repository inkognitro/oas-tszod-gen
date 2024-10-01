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

export const getSapiV1SubAccountUniversaltransferEndpointSchema = {
  path: '/sapi/v1/sub-account/universalTransfer',
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

export type GetSapiV1SubAccountUniversaltransferPayload = {
  queryParams: {
    fromEmail?: string;
    toEmail?: string;
    clientTranId?: string;
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountUniversaltransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
          fromEmail: string;
          toEmail: string;
          asset: string;
          amount: string;
          fromAccountType: string;
          toAccountType: string;
          status: string;
          createTimeStamp: number; // int
          clientTranId: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1SubAccountUniversaltransferRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountUniversaltransferResponse
>;

export function getSapiV1SubAccountUniversaltransfer(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountUniversaltransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountUniversaltransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountUniversaltransferEndpointSchema,
    }),
    config
  );
}

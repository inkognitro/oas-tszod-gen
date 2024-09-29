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

export const getSapiV1AssetTransferEndpointSchema = {
  path: '/sapi/v1/asset/transfer',
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

export type GetSapiV1AssetTransferPayload = {
  queryParams: {
    type:
      | 'MAIN_C2C'
      | 'MAIN_UMFUTURE'
      | 'MAIN_CMFUTURE'
      | 'MAIN_MARGIN'
      | 'MAIN_MINING'
      | 'C2C_MAIN'
      | 'C2C_UMFUTURE'
      | 'C2C_MINING'
      | 'C2C_MARGIN'
      | 'UMFUTURE_MAIN'
      | 'UMFUTURE_C2C'
      | 'UMFUTURE_MARGIN'
      | 'CMFUTURE_MAIN'
      | 'CMFUTURE_MARGIN'
      | 'MARGIN_MAIN'
      | 'MARGIN_UMFUTURE'
      | 'MARGIN_CMFUTURE'
      | 'MARGIN_MINING'
      | 'MARGIN_C2C'
      | 'MINING_MAIN'
      | 'MINING_UMFUTURE'
      | 'MINING_C2C'
      | 'MINING_MARGIN'
      | 'MAIN_PAY'
      | 'PAY_MAIN'
      | 'ISOLATEDMARGIN_MARGIN'
      | 'MARGIN_ISOLATEDMARGIN'
      | 'ISOLATEDMARGIN_ISOLATEDMARGIN';
    startTime?: number; // int
    endTime?: number; // int
    current?: number; // int
    size?: number; // int
    fromSymbol?: string;
    toSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1AssetTransferResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            asset: string;
            amount: string;
            type: string;
            status: string;
            tranId: number; // int
            timestamp: number; // int
          }[];
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1AssetTransferRequestResult = RequestResult<
  Request,
  GetSapiV1AssetTransferResponse
>;

export function getSapiV1AssetTransfer(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1AssetTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1AssetTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1AssetTransferEndpointSchema,
    }),
    config
  );
}

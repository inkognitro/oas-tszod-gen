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

export const postSapiV1AssetTransferEndpointSchema = {
  path: '/sapi/v1/asset/transfer',
  method: 'post',
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

export type PostSapiV1AssetTransferPayload = {
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
    asset: string;
    amount: number;
    fromSymbol?: string;
    toSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AssetTransferResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AssetTransferRequestResult = RequestResult<
  Request,
  PostSapiV1AssetTransferResponse
>;

export function postSapiV1AssetTransfer(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1AssetTransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AssetTransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AssetTransferEndpointSchema,
    }),
    config
  );
}

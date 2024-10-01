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

export const postSapiV1SubAccountFuturesInternaltransferEndpointSchema = {
  path: '/sapi/v1/sub-account/futures/internalTransfer',
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

export type PostSapiV1SubAccountFuturesInternaltransferPayload = {
  queryParams: {
    fromEmail: string;
    toEmail: string;
    futuresType: number; // int
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1SubAccountFuturesInternaltransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          txnId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountFuturesInternaltransferRequestResult =
  RequestResult<Request, PostSapiV1SubAccountFuturesInternaltransferResponse>;

export function postSapiV1SubAccountFuturesInternaltransfer(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1SubAccountFuturesInternaltransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountFuturesInternaltransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1SubAccountFuturesInternaltransferEndpointSchema,
    }),
    config
  );
}

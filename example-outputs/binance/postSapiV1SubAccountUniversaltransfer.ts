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

export const postSapiV1SubAccountUniversaltransferEndpointSchema = {
  path: '/sapi/v1/sub-account/universalTransfer',
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

export type PostSapiV1SubAccountUniversaltransferRequest = RequestUnion<
  any,
  any,
  {
    fromEmail?: string;
    toEmail?: string;
    fromAccountType:
      | 'SPOT'
      | 'USDT_FUTURE'
      | 'COIN_FUTURE'
      | 'MARGIN'
      | 'ISOLATED_MARGIN';
    toAccountType:
      | 'SPOT'
      | 'USDT_FUTURE'
      | 'COIN_FUTURE'
      | 'MARGIN'
      | 'ISOLATED_MARGIN';
    clientTranId?: string;
    symbol?: string;
    asset: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSapiV1SubAccountUniversaltransferResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          tranId: number; // int
          clientTranId: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1SubAccountUniversaltransferRequestResult = RequestResult<
  PostSapiV1SubAccountUniversaltransferRequest,
  PostSapiV1SubAccountUniversaltransferResponse
>;

export function postSapiV1SubAccountUniversaltransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1SubAccountUniversaltransferRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1SubAccountUniversaltransferRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1SubAccountUniversaltransferEndpointSchema, payload),
    config
  );
}

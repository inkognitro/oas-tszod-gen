import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../core';
import {Error} from '../../../../';

export const postBtcEndpointSchema = {
  path: '/sapi/v1/asset/dust-btc',
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

export type PostBtcRequest = RequestUnion<
  any,
  any,
  {
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostBtcResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          details: {
            asset: string;
            assetFullName: string;
            amountFree: string;
            toBTC: string;
            toBNB: string;
            toBNBOffExchange: string;
            exchange: string;
          }[];
          totalTransferBtc: string;
          totalTransferBNB: string;
          dribbletPercentage: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostBtcRequestResult = RequestResult<
  PostBtcRequest,
  PostBtcResponse
>;

export function postBtc(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostBtcRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostBtcRequestResult> {
  return requestHandler.execute(
    createRequest(postBtcEndpointSchema, payload),
    config
  );
}

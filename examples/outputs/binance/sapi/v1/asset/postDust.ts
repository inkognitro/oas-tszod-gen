import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../core';
import {Error} from '../../../';

export const postDustEndpointSchema = {
  path: '/sapi/v1/asset/dust',
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

export type PostDustRequest = RequestUnion<
  any,
  any,
  {
    asset: string[];
    accountType?: 'SPOT' | 'MARGIN';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostDustResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          totalServiceCharge: string;
          totalTransfered: string;
          transferResult: {
            amount: string;
            fromAsset: string;
            operateTime: number; // int
            serviceChargeAmount: string;
            tranId: number; // int
            transferedAmount: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostDustRequestResult = RequestResult<
  PostDustRequest,
  PostDustResponse
>;

export function postDust(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostDustRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostDustRequestResult> {
  return requestHandler.execute(
    createRequest(postDustEndpointSchema, payload),
    config
  );
}

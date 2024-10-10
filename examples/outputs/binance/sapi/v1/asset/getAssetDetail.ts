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

export const getAssetDetailEndpointSchema = {
  path: '/sapi/v1/asset/assetDetail',
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

export type GetAssetDetailRequest = RequestUnion<
  any,
  any,
  {
    asset?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAssetDetailResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          CTR: {
            minWithdrawAmount: string;
            depositStatus: boolean;
            withdrawFee: number; // int
            withdrawStatus: boolean;
            depositTip: string;
          };
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAssetDetailRequestResult = RequestResult<
  GetAssetDetailRequest,
  GetAssetDetailResponse
>;

export function getAssetDetail(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAssetDetailRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAssetDetailRequestResult> {
  return requestHandler.execute(
    createRequest(getAssetDetailEndpointSchema, payload),
    config
  );
}

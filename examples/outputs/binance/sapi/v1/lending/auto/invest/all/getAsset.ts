import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../../core';
import {Error} from '../../../../../../';

export const getAssetEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/all/asset',
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

export type GetAssetRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAssetResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          targetAssets: string[];
          sourceAssets: string[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAssetRequestResult = RequestResult<
  GetAssetRequest,
  GetAssetResponse
>;

export function getAsset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAssetRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAssetRequestResult> {
  return requestHandler.execute(
    createRequest(getAssetEndpointSchema, payload),
    config
  );
}

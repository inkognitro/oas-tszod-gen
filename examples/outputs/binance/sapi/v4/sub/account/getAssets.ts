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

export const getAssetsEndpointSchema = {
  path: '/sapi/v4/sub-account/assets',
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

export type GetAssetsRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAssetsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          balances: {
            asset: string;
            free: string;
            locked: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAssetsRequestResult = RequestResult<
  GetAssetsRequest,
  GetAssetsResponse
>;

export function getAssets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAssetsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAssetsRequestResult> {
  return requestHandler.execute(
    createRequest(getAssetsEndpointSchema, payload),
    config
  );
}

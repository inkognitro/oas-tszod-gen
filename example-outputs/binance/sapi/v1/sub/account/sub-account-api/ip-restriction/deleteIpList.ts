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

export const deleteIpListEndpointSchema = {
  path: '/sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
  method: 'delete',
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

export type DeleteIpListRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    subAccountApiKey: string;
    ipAddress?: string;
    thirdPartyName?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type DeleteIpListResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          ipRestrict: string;
          ipList: string[];
          updateTime: number; // int
          apiKey: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type DeleteIpListRequestResult = RequestResult<
  DeleteIpListRequest,
  DeleteIpListResponse
>;

export function deleteIpList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteIpListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteIpListRequestResult> {
  return requestHandler.execute(
    createRequest(deleteIpListEndpointSchema, payload),
    config
  );
}

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

export const postIpRestrictionEndpointSchema = {
  path: '/sapi/v2/sub-account/subAccountApi/ipRestriction',
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

export type PostIpRestrictionRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    subAccountApiKey: string;
    status: string;
    thirdPartyName?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostIpRestrictionResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          status: string;
          ipList: string[];
          updateTime: number; // int
          apiKey: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostIpRestrictionRequestResult = RequestResult<
  PostIpRestrictionRequest,
  PostIpRestrictionResponse
>;

export function postIpRestriction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostIpRestrictionRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostIpRestrictionRequestResult> {
  return requestHandler.execute(
    createRequest(postIpRestrictionEndpointSchema, payload),
    config
  );
}

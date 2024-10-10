import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '../../../../../core';
import {Error} from '../../../../../';

export const getIpRestrictionEndpointSchema = {
  path: '/sapi/v1/sub-account/subAccountApi/ipRestriction',
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

export type GetIpRestrictionRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    subAccountApiKey: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetIpRestrictionResponse =
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

export type GetIpRestrictionRequestResult = RequestResult<
  GetIpRestrictionRequest,
  GetIpRestrictionResponse
>;

export function getIpRestriction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetIpRestrictionRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetIpRestrictionRequestResult> {
  return requestHandler.execute(
    createRequest(getIpRestrictionEndpointSchema, payload),
    config
  );
}

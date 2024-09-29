import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const postSapiV2SubAccountSubaccountapiIprestrictionEndpointSchema = {
  path: '/sapi/v2/sub-account/subAccountApi/ipRestriction',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV2SubAccountSubaccountapiIprestrictionPayload = {
  queryParams: {
    email: string;
    subAccountApiKey: string;
    status: string;
    thirdPartyName?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV2SubAccountSubaccountapiIprestrictionResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV2SubAccountSubaccountapiIprestrictionRequestResult =
  RequestResult<
    Request,
    PostSapiV2SubAccountSubaccountapiIprestrictionResponse
  >;

export function postSapiV2SubAccountSubaccountapiIprestriction(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV2SubAccountSubaccountapiIprestrictionPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV2SubAccountSubaccountapiIprestrictionRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        postSapiV2SubAccountSubaccountapiIprestrictionEndpointSchema,
    }),
    config
  );
}

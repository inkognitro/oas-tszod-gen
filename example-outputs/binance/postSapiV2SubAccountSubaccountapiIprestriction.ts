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

export const postSapiV2SubAccountSubaccountapiIprestrictionEndpointSchema = {
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

export type PostSapiV2SubAccountSubaccountapiIprestrictionRequest =
  RequestUnion<
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

export type PostSapiV2SubAccountSubaccountapiIprestrictionResponse =
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

export type PostSapiV2SubAccountSubaccountapiIprestrictionRequestResult =
  RequestResult<
    PostSapiV2SubAccountSubaccountapiIprestrictionRequest,
    PostSapiV2SubAccountSubaccountapiIprestrictionResponse
  >;

export function postSapiV2SubAccountSubaccountapiIprestriction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV2SubAccountSubaccountapiIprestrictionRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV2SubAccountSubaccountapiIprestrictionRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV2SubAccountSubaccountapiIprestrictionEndpointSchema,
      payload
    ),
    config
  );
}

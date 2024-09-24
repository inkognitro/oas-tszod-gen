import {Error} from '@example-outputs/binance';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance/core';

export const getSapiV1SubAccountSubaccountapiIprestrictionEndpointSchema = {
  path: '/sapi/v1/sub-account/subAccountApi/ipRestriction',
  method: 'get',
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

export type GetSapiV1SubAccountSubaccountapiIprestrictionPayload = {
  queryParams: {
    email: string;
    subAccountApiKey: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountSubaccountapiIprestrictionResponse =
  | Response<
      200,
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SubAccountSubaccountapiIprestrictionRequestResult =
  RequestResult<Request, GetSapiV1SubAccountSubaccountapiIprestrictionResponse>;

export function getSapiV1SubAccountSubaccountapiIprestriction(
  requestHandler: RequestHandler,
  payload: GetSapiV1SubAccountSubaccountapiIprestrictionPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountSubaccountapiIprestrictionRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        getSapiV1SubAccountSubaccountapiIprestrictionEndpointSchema,
    }),
    config
  );
}

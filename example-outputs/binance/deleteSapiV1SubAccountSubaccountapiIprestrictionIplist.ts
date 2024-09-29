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

export const deleteSapiV1SubAccountSubaccountapiIprestrictionIplistEndpointSchema =
  {
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

export type DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistPayload = {
  queryParams: {
    email: string;
    subAccountApiKey: string;
    ipAddress?: string;
    thirdPartyName?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistRequestResult =
  RequestResult<
    Request,
    DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistResponse
  >;

export function deleteSapiV1SubAccountSubaccountapiIprestrictionIplist(
  requestHandler: SimpleRequestHandler,
  payload: DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema:
        deleteSapiV1SubAccountSubaccountapiIprestrictionIplistEndpointSchema,
    }),
    config
  );
}

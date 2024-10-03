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

export type DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistRequest =
  RequestUnion<
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

export type DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistResponse =
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

export type DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistRequestResult =
  RequestResult<
    DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistRequest,
    DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistResponse
  >;

export function deleteSapiV1SubAccountSubaccountapiIprestrictionIplist(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteSapiV1SubAccountSubaccountapiIprestrictionIplistRequestResult> {
  return requestHandler.execute(
    createRequest(
      deleteSapiV1SubAccountSubaccountapiIprestrictionIplistEndpointSchema,
      payload
    ),
    config
  );
}

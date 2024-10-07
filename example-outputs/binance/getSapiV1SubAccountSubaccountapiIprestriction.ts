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

export const getSapiV1SubAccountSubaccountapiIprestrictionEndpointSchema = {
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

export type GetSapiV1SubAccountSubaccountapiIprestrictionRequest = RequestUnion<
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

export type GetSapiV1SubAccountSubaccountapiIprestrictionResponse =
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

export type GetSapiV1SubAccountSubaccountapiIprestrictionRequestResult =
  RequestResult<
    GetSapiV1SubAccountSubaccountapiIprestrictionRequest,
    GetSapiV1SubAccountSubaccountapiIprestrictionResponse
  >;

export function getSapiV1SubAccountSubaccountapiIprestriction(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    GetSapiV1SubAccountSubaccountapiIprestrictionRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountSubaccountapiIprestrictionRequestResult> {
  return requestHandler.execute(
    createRequest(
      getSapiV1SubAccountSubaccountapiIprestrictionEndpointSchema,
      payload
    ),
    config
  );
}

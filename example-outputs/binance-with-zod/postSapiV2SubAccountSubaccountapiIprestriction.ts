import {z_Error, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  RequestUnion,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV2SubAccountSubaccountapiIprestrictionEndpointSchema = {
  path: '/sapi/v2/sub-account/subAccountApi/ipRestriction',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    subAccountApiKey: z.string(),
    status: z.string(),
    thirdPartyName: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.object({
            status: z.string(),
            ipList: z.array(z.string()),
            updateTime: z.number().int().safe().finite(),
            apiKey: z.string(),
          }),
        },
      },
    },
    '400': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
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

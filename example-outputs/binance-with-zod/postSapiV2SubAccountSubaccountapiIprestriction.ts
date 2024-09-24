import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  RequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV2SubAccountSubaccountapiIprestrictionEndpointSchema = {
  path: '/sapi/v2/sub-account/subAccountApi/ipRestriction',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
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
      ResponseData<
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
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type PostSapiV2SubAccountSubaccountapiIprestrictionRequestResult =
  RequestResult<
    Request,
    PostSapiV2SubAccountSubaccountapiIprestrictionResponse
  >;

export function postSapiV2SubAccountSubaccountapiIprestriction(
  requestHandler: RequestHandler,
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

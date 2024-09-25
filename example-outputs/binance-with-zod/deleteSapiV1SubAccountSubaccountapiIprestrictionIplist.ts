import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const deleteSapiV1SubAccountSubaccountapiIprestrictionIplistEndpointSchema =
  {
    path: '/sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
    method: 'delete',
    supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
    queryParamsZodSchema: z.object({
      email: z.string(),
      subAccountApiKey: z.string(),
      ipAddress: z.string().optional(),
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
              ipRestrict: z.string(),
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

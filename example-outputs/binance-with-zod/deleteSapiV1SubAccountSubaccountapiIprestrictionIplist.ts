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

export const deleteSapiV1SubAccountSubaccountapiIprestrictionIplistEndpointSchema =
  {
    path: '/sapi/v1/sub-account/subAccountApi/ipRestriction/ipList',
    method: 'delete',
    supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

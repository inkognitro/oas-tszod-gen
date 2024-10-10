import {z_Error, Error} from '../../../../../../';
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
} from '../../../../../../core';

export const deleteIpListEndpointSchema = {
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

export type DeleteIpListRequest = RequestUnion<
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

export type DeleteIpListResponse =
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

export type DeleteIpListRequestResult = RequestResult<
  DeleteIpListRequest,
  DeleteIpListResponse
>;

export function deleteIpList(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeleteIpListRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteIpListRequestResult> {
  return requestHandler.execute(
    createRequest(deleteIpListEndpointSchema, payload),
    config
  );
}

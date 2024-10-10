import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const getInfoEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/info',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    page: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().optional(),
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
            total: z.number().int().safe().finite(),
            managerSubUserInfoVoList: z.array(
              z.object({
                rootUserId: z.number().int().safe().finite(),
                managersubUserId: z.number().int().safe().finite(),
                bindParentUserId: z.number().int().safe().finite(),
                email: z.string().optional(),
                insertTimeStamp: z.number().int().safe().finite(),
                bindParentEmail: z.string(),
                isSubUserEnabled: z.boolean(),
                isUserActive: z.boolean(),
                isMarginEnabled: z.boolean(),
                isFutureEnabled: z.boolean(),
                isSignedLVTRiskAgreement: z.boolean(),
              })
            ),
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

export type GetInfoRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetInfoResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          managerSubUserInfoVoList: {
            rootUserId: number; // int
            managersubUserId: number; // int
            bindParentUserId: number; // int
            email?: string;
            insertTimeStamp: number; // int
            bindParentEmail: string;
            isSubUserEnabled: boolean;
            isUserActive: boolean;
            isMarginEnabled: boolean;
            isFutureEnabled: boolean;
            isSignedLVTRiskAgreement: boolean;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetInfoRequestResult = RequestResult<
  GetInfoRequest,
  GetInfoResponse
>;

export function getInfo(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetInfoRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetInfoRequestResult> {
  return requestHandler.execute(
    createRequest(getInfoEndpointSchema, payload),
    config
  );
}

import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1ManagedSubaccountInfoEndpointSchema = {
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

export type GetSapiV1ManagedSubaccountInfoPayload = {
  queryParams: {
    email: string;
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1ManagedSubaccountInfoResponse =
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

export type GetSapiV1ManagedSubaccountInfoRequestResult = RequestResult<
  Request,
  GetSapiV1ManagedSubaccountInfoResponse
>;

export function getSapiV1ManagedSubaccountInfo(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1ManagedSubaccountInfoPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1ManagedSubaccountInfoRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1ManagedSubaccountInfoEndpointSchema,
    }),
    config
  );
}

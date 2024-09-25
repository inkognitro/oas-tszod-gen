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

export const getSapiV1SubAccountTransferSubuserhistoryEndpointSchema = {
  path: '/sapi/v1/sub-account/transfer/subUserHistory',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    asset: z.string().optional(),
    type: z.number().int().safe().finite().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
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
          zodSchema: z.array(
            z.object({
              counterParty: z.string(),
              email: z.string(),
              type: z.number().int().safe().finite(),
              asset: z.string(),
              qty: z.string(),
              fromAccountType: z.string(),
              toAccountType: z.string(),
              status: z.string(),
              tranId: z.number().int().safe().finite(),
              time: z.number().int().safe().finite(),
            })
          ),
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

export type GetSapiV1SubAccountTransferSubuserhistoryPayload = {
  queryParams: {
    asset?: string;
    type?: number; // int
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountTransferSubuserhistoryResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            counterParty: string;
            email: string;
            type: number; // int
            asset: string;
            qty: string;
            fromAccountType: string;
            toAccountType: string;
            status: string;
            tranId: number; // int
            time: number; // int
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SubAccountTransferSubuserhistoryRequestResult =
  RequestResult<Request, GetSapiV1SubAccountTransferSubuserhistoryResponse>;

export function getSapiV1SubAccountTransferSubuserhistory(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1SubAccountTransferSubuserhistoryPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountTransferSubuserhistoryRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountTransferSubuserhistoryEndpointSchema,
    }),
    config
  );
}

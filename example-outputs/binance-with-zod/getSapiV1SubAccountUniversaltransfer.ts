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

export const getSapiV1SubAccountUniversaltransferEndpointSchema = {
  path: '/sapi/v1/sub-account/universalTransfer',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
  queryParamsZodSchema: z.object({
    fromEmail: z.string().optional(),
    toEmail: z.string().optional(),
    clientTranId: z.string().optional(),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
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
          zodSchema: z.array(
            z.object({
              tranId: z.number().int().safe().finite(),
              fromEmail: z.string(),
              toEmail: z.string(),
              asset: z.string(),
              amount: z.string(),
              fromAccountType: z.string(),
              toAccountType: z.string(),
              status: z.string(),
              createTimeStamp: z.number().int().safe().finite(),
              clientTranId: z.string(),
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

export type GetSapiV1SubAccountUniversaltransferPayload = {
  queryParams: {
    fromEmail?: string;
    toEmail?: string;
    clientTranId?: string;
    startTime?: number; // int
    endTime?: number; // int
    page?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1SubAccountUniversaltransferResponse =
  | Response<
      200,
      ResponseData<
        ResponseBodyData<
          'application/json',
          {
            tranId: number; // int
            fromEmail: string;
            toEmail: string;
            asset: string;
            amount: string;
            fromAccountType: string;
            toAccountType: string;
            status: string;
            createTimeStamp: number; // int
            clientTranId: string;
          }[]
        >
      >
    >
  | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>
  | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>;

export type GetSapiV1SubAccountUniversaltransferRequestResult = RequestResult<
  Request,
  GetSapiV1SubAccountUniversaltransferResponse
>;

export function getSapiV1SubAccountUniversaltransfer(
  requestHandler: RequestHandler,
  payload: GetSapiV1SubAccountUniversaltransferPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1SubAccountUniversaltransferRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1SubAccountUniversaltransferEndpointSchema,
    }),
    config
  );
}

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

export const getUniversalTransferEndpointSchema = {
  path: '/sapi/v1/sub-account/universalTransfer',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
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

export type GetUniversalTransferRequest = RequestUnion<
  any,
  any,
  {
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
  }
>;

export type GetUniversalTransferResponse =
  | ResponseUnion<
      200,
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
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetUniversalTransferRequestResult = RequestResult<
  GetUniversalTransferRequest,
  GetUniversalTransferResponse
>;

export function getUniversalTransfer(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetUniversalTransferRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetUniversalTransferRequestResult> {
  return requestHandler.execute(
    createRequest(getUniversalTransferEndpointSchema, payload),
    config
  );
}

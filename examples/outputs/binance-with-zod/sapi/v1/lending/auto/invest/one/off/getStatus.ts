import {z_Error, Error} from '../../../../../../../';
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
} from '../../../../../../../core';

export const getStatusEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/one-off/status',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    transactionId: z.number().int().safe().finite(),
    requestId: z.string().optional(),
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
            transactionId: z.number().int().safe().finite(),
            status: z.string(),
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

export type GetStatusRequest = RequestUnion<
  any,
  any,
  {
    transactionId: number; // int
    requestId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          transactionId: number; // int
          status: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetStatusRequestResult = RequestResult<
  GetStatusRequest,
  GetStatusResponse
>;

export function getStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetStatusRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetStatusRequestResult> {
  return requestHandler.execute(
    createRequest(getStatusEndpointSchema, payload),
    config
  );
}

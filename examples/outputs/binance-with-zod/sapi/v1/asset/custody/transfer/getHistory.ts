import {z_Error, Error} from '../../../../../';
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
} from '../../../../../core';

export const getHistoryEndpointSchema = {
  path: '/sapi/v1/asset/custody/transfer-history',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
    startTime: z.number().int().safe().finite(),
    endTime: z.number().int().safe().finite(),
    type: z.string().optional(),
    asset: z.string(),
    current: z.number().int().safe().finite().optional(),
    size: z.number().int().safe().finite().optional(),
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
            rows: z.array(
              z.object({
                clientTranId: z.string(),
                transferType: z.string(),
                asset: z.string(),
                amount: z.string(),
                time: z.number().int().safe().finite(),
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

export type GetHistoryRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    startTime: number; // int
    endTime: number; // int
    type?: string;
    asset: string;
    current?: number; // int
    size?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetHistoryResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          total: number; // int
          rows: {
            clientTranId: string;
            transferType: string;
            asset: string;
            amount: string;
            time: number; // int
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetHistoryRequestResult = RequestResult<
  GetHistoryRequest,
  GetHistoryResponse
>;

export function getHistory(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetHistoryRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetHistoryRequestResult> {
  return requestHandler.execute(
    createRequest(getHistoryEndpointSchema, payload),
    config
  );
}

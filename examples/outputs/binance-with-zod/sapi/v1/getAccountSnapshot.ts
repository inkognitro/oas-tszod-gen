import {
  z_SnapshotSpot,
  z_SnapshotMargin,
  z_SnapshotFutures,
  z_Error,
  SnapshotSpot,
  SnapshotMargin,
  SnapshotFutures,
  Error,
} from '../../';
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
} from '../../core';

export const getAccountSnapshotEndpointSchema = {
  path: '/sapi/v1/accountSnapshot',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    type: z.enum(['SPOT', 'MARGIN', 'FUTURES']),
    startTime: z.number().int().safe().finite().optional(),
    endTime: z.number().int().safe().finite().optional(),
    limit: z.number().int().safe().finite().gte(7).lte(30).optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.union([
            z_SnapshotSpot,
            z_SnapshotMargin,
            z_SnapshotFutures,
          ]),
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

export type GetAccountSnapshotRequest = RequestUnion<
  any,
  any,
  {
    type: 'SPOT' | 'MARGIN' | 'FUTURES';
    startTime?: number; // int
    endTime?: number; // int
    limit?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAccountSnapshotResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        SnapshotSpot | SnapshotMargin | SnapshotFutures
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAccountSnapshotRequestResult = RequestResult<
  GetAccountSnapshotRequest,
  GetAccountSnapshotResponse
>;

export function getAccountSnapshot(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAccountSnapshotRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountSnapshotRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountSnapshotEndpointSchema, payload),
    config
  );
}

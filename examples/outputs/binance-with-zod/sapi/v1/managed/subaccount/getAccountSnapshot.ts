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

export const getAccountSnapshotEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/accountSnapshot',
  method: 'get',
  supportedSecuritySchemas: [],
  queryParamsZodSchema: z.object({
    email: z.string(),
    type: z.string(),
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
          zodSchema: z.object({
            code: z.number().int().safe().finite(),
            msg: z.string(),
            snapshotVos: z.array(
              z.object({
                data: z.object({
                  balances: z.array(
                    z.object({
                      asset: z.string(),
                      free: z.string(),
                      locked: z.string(),
                    })
                  ),
                  totalAssetOfBtc: z.string(),
                }),
                type: z.string(),
                updateTime: z.number().int().safe().finite(),
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

export type GetAccountSnapshotRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    type: string;
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
        {
          code: number; // int
          msg: string;
          snapshotVos: {
            data: {
              balances: {
                asset: string;
                free: string;
                locked: string;
              }[];
              totalAssetOfBtc: string;
            };
            type: string;
            updateTime: number; // int
          }[];
        }
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

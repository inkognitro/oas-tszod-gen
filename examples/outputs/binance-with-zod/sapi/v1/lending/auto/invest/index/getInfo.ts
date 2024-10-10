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

export const getInfoEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/index/info',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    indexId: z.number().int().safe().finite(),
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
            indexId: z.number().int().safe().finite(),
            indexName: z.string(),
            status: z.string(),
            assetAllocation: z.array(
              z.object({
                targetAsset: z.string(),
                allocation: z.string(),
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
    indexId: number; // int
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
          indexId: number; // int
          indexName: string;
          status: string;
          assetAllocation: {
            targetAsset: string;
            allocation: string;
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

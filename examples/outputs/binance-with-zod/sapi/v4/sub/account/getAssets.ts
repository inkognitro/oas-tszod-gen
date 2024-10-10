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

export const getAssetsEndpointSchema = {
  path: '/sapi/v4/sub-account/assets',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string(),
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
            balances: z.array(
              z.object({
                asset: z.string(),
                free: z.string(),
                locked: z.string(),
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

export type GetAssetsRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAssetsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          balances: {
            asset: string;
            free: string;
            locked: string;
          }[];
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAssetsRequestResult = RequestResult<
  GetAssetsRequest,
  GetAssetsResponse
>;

export function getAssets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAssetsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAssetsRequestResult> {
  return requestHandler.execute(
    createRequest(getAssetsEndpointSchema, payload),
    config
  );
}

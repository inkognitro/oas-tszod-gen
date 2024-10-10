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

export const getAssetEndpointSchema = {
  path: '/sapi/v1/managed-subaccount/asset',
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
          zodSchema: z.array(
            z.object({
              coin: z.string(),
              name: z.string(),
              totalBalance: z.string(),
              availableBalance: z.string(),
              inOrder: z.string(),
              btcValue: z.string(),
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

export type GetAssetRequest = RequestUnion<
  any,
  any,
  {
    email: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAssetResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          coin: string;
          name: string;
          totalBalance: string;
          availableBalance: string;
          inOrder: string;
          btcValue: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAssetRequestResult = RequestResult<
  GetAssetRequest,
  GetAssetResponse
>;

export function getAsset(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAssetRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAssetRequestResult> {
  return requestHandler.execute(
    createRequest(getAssetEndpointSchema, payload),
    config
  );
}

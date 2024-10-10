import {z_Error, Error} from '../../../';
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
} from '../../../core';

export const getAllAssetsEndpointSchema = {
  path: '/sapi/v1/margin/allAssets',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              assetFullName: z.string(),
              assetName: z.string(),
              isBorrowable: z.boolean(),
              isMortgageable: z.boolean(),
              userMinBorrow: z.string(),
              userMinRepay: z.string(),
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
  },
};

export type GetAllAssetsRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
  }
>;

export type GetAllAssetsResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          assetFullName: string;
          assetName: string;
          isBorrowable: boolean;
          isMortgageable: boolean;
          userMinBorrow: string;
          userMinRepay: string;
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>;

export type GetAllAssetsRequestResult = RequestResult<
  GetAllAssetsRequest,
  GetAllAssetsResponse
>;

export function getAllAssets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAllAssetsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAllAssetsRequestResult> {
  return requestHandler.execute(
    createRequest(getAllAssetsEndpointSchema, payload),
    config
  );
}

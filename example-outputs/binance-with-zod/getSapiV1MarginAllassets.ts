import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const getSapiV1MarginAllassetsEndpointSchema = {
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
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1MarginAllassetsRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
  }
>;

export type GetSapiV1MarginAllassetsResponse =
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

export type GetSapiV1MarginAllassetsRequestResult = RequestResult<
  GetSapiV1MarginAllassetsRequest,
  GetSapiV1MarginAllassetsResponse
>;

export function getSapiV1MarginAllassets(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1MarginAllassetsRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllassetsRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1MarginAllassetsEndpointSchema, payload),
    config
  );
}

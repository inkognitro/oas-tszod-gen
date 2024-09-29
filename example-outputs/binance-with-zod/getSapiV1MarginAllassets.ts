import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
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

export type GetSapiV1MarginAllassetsPayload = {
  queryParams: {
    asset: string;
  };
};

export type GetSapiV1MarginAllassetsResponse =
  | Response<
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
  | Response<400, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginAllassetsRequestResult = RequestResult<
  Request,
  GetSapiV1MarginAllassetsResponse
>;

export function getSapiV1MarginAllassets(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginAllassetsPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginAllassetsRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginAllassetsEndpointSchema,
    }),
    config
  );
}

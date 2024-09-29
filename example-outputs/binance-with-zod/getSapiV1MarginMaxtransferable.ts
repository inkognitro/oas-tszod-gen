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

export const getSapiV1MarginMaxtransferableEndpointSchema = {
  path: '/sapi/v1/margin/maxTransferable',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    asset: z.string(),
    isolatedSymbol: z.string().optional(),
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
            amount: z.string(),
            borrowLimit: z.string(),
          }),
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
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type GetSapiV1MarginMaxtransferablePayload = {
  queryParams: {
    asset: string;
    isolatedSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1MarginMaxtransferableResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          amount: string;
          borrowLimit: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1MarginMaxtransferableRequestResult = RequestResult<
  Request,
  GetSapiV1MarginMaxtransferableResponse
>;

export function getSapiV1MarginMaxtransferable(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1MarginMaxtransferablePayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1MarginMaxtransferableRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: getSapiV1MarginMaxtransferableEndpointSchema,
    }),
    config
  );
}

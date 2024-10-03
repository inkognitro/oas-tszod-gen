import {
  bnbBurnStatusZodSchema,
  errorZodSchema,
  BnbBurnStatus,
  Error,
} from '@example-outputs/binance-with-zod';
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

export const getSapiV1BnbburnEndpointSchema = {
  path: '/sapi/v1/bnbBurn',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: bnbBurnStatusZodSchema,
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

export type GetSapiV1BnbburnRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetSapiV1BnbburnResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', BnbBurnStatus>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1BnbburnRequestResult = RequestResult<
  GetSapiV1BnbburnRequest,
  GetSapiV1BnbburnResponse
>;

export function getSapiV1Bnbburn(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetSapiV1BnbburnRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BnbburnRequestResult> {
  return requestHandler.execute(
    createRequest(getSapiV1BnbburnEndpointSchema, payload),
    config
  );
}

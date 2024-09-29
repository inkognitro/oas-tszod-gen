import {
  bnbBurnStatusZodSchema,
  errorZodSchema,
  BnbBurnStatus,
  Error,
} from '@example-outputs/binance-with-zod';
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

export type GetSapiV1BnbburnPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetSapiV1BnbburnResponse =
  | Response<200, ResponseBodyData<'application/json', BnbBurnStatus>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetSapiV1BnbburnRequestResult = RequestResult<
  Request,
  GetSapiV1BnbburnResponse
>;

export function getSapiV1Bnbburn(
  requestHandler: SimpleRequestHandler,
  payload: GetSapiV1BnbburnPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetSapiV1BnbburnRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getSapiV1BnbburnEndpointSchema}),
    config
  );
}

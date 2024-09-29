import {
  accountZodSchema,
  errorZodSchema,
  Account,
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

export const getApiV3AccountEndpointSchema = {
  path: '/api/v3/account',
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
          zodSchema: accountZodSchema,
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

export type GetApiV3AccountPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type GetApiV3AccountResponse =
  | Response<200, ResponseBodyData<'application/json', Account>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3AccountRequestResult = RequestResult<
  Request,
  GetApiV3AccountResponse
>;

export function getApiV3Account(
  requestHandler: SimpleRequestHandler,
  payload: GetApiV3AccountPayload,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AccountRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: getApiV3AccountEndpointSchema}),
    config
  );
}

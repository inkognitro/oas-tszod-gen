import {
  accountZodSchema,
  errorZodSchema,
  Account,
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

export type GetApiV3AccountRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetApiV3AccountResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Account>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetApiV3AccountRequestResult = RequestResult<
  GetApiV3AccountRequest,
  GetApiV3AccountResponse
>;

export function getApiV3Account(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetApiV3AccountRequest, 'queryParams'>,
  config?: RequestHandlerExecutionConfig
): Promise<GetApiV3AccountRequestResult> {
  return requestHandler.execute(
    createRequest(getApiV3AccountEndpointSchema, payload),
    config
  );
}

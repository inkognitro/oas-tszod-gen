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

export const getAccountLimitEndpointSchema = {
  path: '/sapi/v1/margin/isolated/accountLimit',
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
          zodSchema: z.object({
            enabledAccount: z.number().int().safe().finite(),
            maxAccount: z.number().int().safe().finite(),
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

export type GetAccountLimitRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetAccountLimitResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          enabledAccount: number; // int
          maxAccount: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetAccountLimitRequestResult = RequestResult<
  GetAccountLimitRequest,
  GetAccountLimitResponse
>;

export function getAccountLimit(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetAccountLimitRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetAccountLimitRequestResult> {
  return requestHandler.execute(
    createRequest(getAccountLimitEndpointSchema, payload),
    config
  );
}

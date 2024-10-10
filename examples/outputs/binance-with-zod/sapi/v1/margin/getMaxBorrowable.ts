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

export const getMaxBorrowableEndpointSchema = {
  path: '/sapi/v1/margin/maxBorrowable',
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

export type GetMaxBorrowableRequest = RequestUnion<
  any,
  any,
  {
    asset: string;
    isolatedSymbol?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetMaxBorrowableResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          amount: string;
          borrowLimit: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetMaxBorrowableRequestResult = RequestResult<
  GetMaxBorrowableRequest,
  GetMaxBorrowableResponse
>;

export function getMaxBorrowable(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetMaxBorrowableRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetMaxBorrowableRequestResult> {
  return requestHandler.execute(
    createRequest(getMaxBorrowableEndpointSchema, payload),
    config
  );
}

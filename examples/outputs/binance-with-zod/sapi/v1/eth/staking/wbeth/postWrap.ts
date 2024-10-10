import {z_Error, Error} from '../../../../../';
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
} from '../../../../../core';

export const postWrapEndpointSchema = {
  path: '/sapi/v1/eth-staking/wbeth/wrap',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    amount: z.number().safe().finite(),
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
            success: z.boolean(),
            wbethAmount: z.string(),
            exchangeRate: z.string(),
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

export type PostWrapRequest = RequestUnion<
  any,
  any,
  {
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostWrapResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
          wbethAmount: string;
          exchangeRate: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostWrapRequestResult = RequestResult<
  PostWrapRequest,
  PostWrapResponse
>;

export function postWrap(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostWrapRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostWrapRequestResult> {
  return requestHandler.execute(
    createRequest(postWrapEndpointSchema, payload),
    config
  );
}

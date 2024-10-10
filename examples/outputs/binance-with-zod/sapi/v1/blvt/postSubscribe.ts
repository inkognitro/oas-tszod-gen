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

export const postSubscribeEndpointSchema = {
  path: '/sapi/v1/blvt/subscribe',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    tokenName: z.string(),
    cost: z.number().safe().finite(),
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
            id: z.number().int().safe().finite(),
            status: z.string(),
            tokenName: z.string(),
            amount: z.string(),
            cost: z.string(),
            timestamp: z.number().int().safe().finite(),
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

export type PostSubscribeRequest = RequestUnion<
  any,
  any,
  {
    tokenName: string;
    cost: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          id: number; // int
          status: string;
          tokenName: string;
          amount: string;
          cost: string;
          timestamp: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSubscribeRequestResult = RequestResult<
  PostSubscribeRequest,
  PostSubscribeResponse
>;

export function postSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSubscribeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(postSubscribeEndpointSchema, payload),
    config
  );
}

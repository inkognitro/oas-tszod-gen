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

export const postSetAutoSubscribeEndpointSchema = {
  path: '/sapi/v1/simple-earn/flexible/setAutoSubscribe',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    productId: z.string(),
    autoSubscribe: z.boolean(),
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

export type PostSetAutoSubscribeRequest = RequestUnion<
  any,
  any,
  {
    productId: string;
    autoSubscribe: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSetAutoSubscribeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSetAutoSubscribeRequestResult = RequestResult<
  PostSetAutoSubscribeRequest,
  PostSetAutoSubscribeResponse
>;

export function postSetAutoSubscribe(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSetAutoSubscribeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSetAutoSubscribeRequestResult> {
  return requestHandler.execute(
    createRequest(postSetAutoSubscribeEndpointSchema, payload),
    config
  );
}

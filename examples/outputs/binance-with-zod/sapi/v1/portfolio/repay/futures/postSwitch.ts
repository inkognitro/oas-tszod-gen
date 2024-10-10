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

export const postSwitchEndpointSchema = {
  path: '/sapi/v1/portfolio/repay-futures-switch',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    autoRepay: z.boolean(),
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
            msg: z.string(),
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

export type PostSwitchRequest = RequestUnion<
  any,
  any,
  {
    autoRepay: boolean;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostSwitchResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          msg: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostSwitchRequestResult = RequestResult<
  PostSwitchRequest,
  PostSwitchResponse
>;

export function postSwitch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostSwitchRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostSwitchRequestResult> {
  return requestHandler.execute(
    createRequest(postSwitchEndpointSchema, payload),
    config
  );
}

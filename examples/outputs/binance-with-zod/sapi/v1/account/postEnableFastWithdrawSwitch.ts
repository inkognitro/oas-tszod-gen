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

export const postEnableFastWithdrawSwitchEndpointSchema = {
  path: '/sapi/v1/account/enableFastWithdrawSwitch',
  method: 'post',
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
          zodSchema: z.object({}),
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

export type PostEnableFastWithdrawSwitchRequest = RequestUnion<
  any,
  any,
  {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostEnableFastWithdrawSwitchResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostEnableFastWithdrawSwitchRequestResult = RequestResult<
  PostEnableFastWithdrawSwitchRequest,
  PostEnableFastWithdrawSwitchResponse
>;

export function postEnableFastWithdrawSwitch(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostEnableFastWithdrawSwitchRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostEnableFastWithdrawSwitchRequestResult> {
  return requestHandler.execute(
    createRequest(postEnableFastWithdrawSwitchEndpointSchema, payload),
    config
  );
}

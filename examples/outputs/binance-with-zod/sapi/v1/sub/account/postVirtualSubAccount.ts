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

export const postVirtualSubAccountEndpointSchema = {
  path: '/sapi/v1/sub-account/virtualSubAccount',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    subAccountString: z.string(),
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
            email: z.string(),
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

export type PostVirtualSubAccountRequest = RequestUnion<
  any,
  any,
  {
    subAccountString: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostVirtualSubAccountResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostVirtualSubAccountRequestResult = RequestResult<
  PostVirtualSubAccountRequest,
  PostVirtualSubAccountResponse
>;

export function postVirtualSubAccount(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostVirtualSubAccountRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostVirtualSubAccountRequestResult> {
  return requestHandler.execute(
    createRequest(postVirtualSubAccountEndpointSchema, payload),
    config
  );
}

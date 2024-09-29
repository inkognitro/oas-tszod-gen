import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
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

export const postSapiV1AccountEnablefastwithdrawswitchEndpointSchema = {
  path: '/sapi/v1/account/enableFastWithdrawSwitch',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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

export type PostSapiV1AccountEnablefastwithdrawswitchPayload = {
  queryParams: {
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1AccountEnablefastwithdrawswitchResponse =
  | Response<200, ResponseBodyData<'application/json', {}>>
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1AccountEnablefastwithdrawswitchRequestResult =
  RequestResult<Request, PostSapiV1AccountEnablefastwithdrawswitchResponse>;

export function postSapiV1AccountEnablefastwithdrawswitch(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1AccountEnablefastwithdrawswitchPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1AccountEnablefastwithdrawswitchRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1AccountEnablefastwithdrawswitchEndpointSchema,
    }),
    config
  );
}

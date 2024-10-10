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

export const postCoinsEndpointSchema = {
  path: '/sapi/v1/capital/contract/convertible-coins',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    coin: z.string(),
    enable: z.boolean(),
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

export type PostCoinsRequest = RequestUnion<
  any,
  any,
  {
    coin: string;
    enable: boolean;
  }
>;

export type PostCoinsResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', {}>>
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostCoinsRequestResult = RequestResult<
  PostCoinsRequest,
  PostCoinsResponse
>;

export function postCoins(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostCoinsRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostCoinsRequestResult> {
  return requestHandler.execute(
    createRequest(postCoinsEndpointSchema, payload),
    config
  );
}

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

export const postConfigEndpointSchema = {
  path: '/sapi/v1/mining/hash-transfer/config',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    userName: z.string(),
    algo: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    toPoolUser: z.string(),
    hashRate: z.string(),
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
            code: z.number().int().safe().finite(),
            msg: z.string(),
            data: z.number().int().safe().finite(),
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

export type PostConfigRequest = RequestUnion<
  any,
  any,
  {
    userName: string;
    algo: string;
    startDate?: string;
    endDate?: string;
    toPoolUser: string;
    hashRate: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostConfigResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: number; // int
          msg: string;
          data: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostConfigRequestResult = RequestResult<
  PostConfigRequest,
  PostConfigResponse
>;

export function postConfig(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostConfigRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostConfigRequestResult> {
  return requestHandler.execute(
    createRequest(postConfigEndpointSchema, payload),
    config
  );
}

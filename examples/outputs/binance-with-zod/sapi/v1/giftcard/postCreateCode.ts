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

export const postCreateCodeEndpointSchema = {
  path: '/sapi/v1/giftcard/createCode',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    token: z.string(),
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
            code: z.string(),
            message: z.string(),
            data: z.object({
              referenceNo: z.string(),
              code: z.string(),
              expiredTime: z.number().int().safe().finite(),
            }),
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

export type PostCreateCodeRequest = RequestUnion<
  any,
  any,
  {
    token: string;
    amount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostCreateCodeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            referenceNo: string;
            code: string;
            expiredTime: number; // int
          };
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostCreateCodeRequestResult = RequestResult<
  PostCreateCodeRequest,
  PostCreateCodeResponse
>;

export function postCreateCode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostCreateCodeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostCreateCodeRequestResult> {
  return requestHandler.execute(
    createRequest(postCreateCodeEndpointSchema, payload),
    config
  );
}

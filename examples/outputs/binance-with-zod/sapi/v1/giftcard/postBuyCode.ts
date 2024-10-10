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

export const postBuyCodeEndpointSchema = {
  path: '/sapi/v1/giftcard/buyCode',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    baseToken: z.string(),
    faceToken: z.string(),
    baseTokenAmount: z.number().safe().finite(),
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

export type PostBuyCodeRequest = RequestUnion<
  any,
  any,
  {
    baseToken: string;
    faceToken: string;
    baseTokenAmount: number;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostBuyCodeResponse =
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

export type PostBuyCodeRequestResult = RequestResult<
  PostBuyCodeRequest,
  PostBuyCodeResponse
>;

export function postBuyCode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostBuyCodeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostBuyCodeRequestResult> {
  return requestHandler.execute(
    createRequest(postBuyCodeEndpointSchema, payload),
    config
  );
}

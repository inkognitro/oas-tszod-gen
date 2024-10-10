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

export const postApplyEndpointSchema = {
  path: '/sapi/v1/capital/deposit/credit-apply',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    depositId: z.number().int().safe().finite().optional(),
    txId: z.string().optional(),
    subAccountId: z.number().int().safe().finite().optional(),
    subUserId: z.number().int().safe().finite().optional(),
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
            data: z.boolean(),
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

export type PostApplyRequest = RequestUnion<
  any,
  any,
  {
    depositId?: number; // int
    txId?: string;
    subAccountId?: number; // int
    subUserId?: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostApplyResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: boolean;
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostApplyRequestResult = RequestResult<
  PostApplyRequest,
  PostApplyResponse
>;

export function postApply(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostApplyRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostApplyRequestResult> {
  return requestHandler.execute(
    createRequest(postApplyEndpointSchema, payload),
    config
  );
}

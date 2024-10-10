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

export const postRedeemCodeEndpointSchema = {
  path: '/sapi/v1/giftcard/redeemCode',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    code: z.string(),
    externalUid: z.string().optional(),
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
              token: z.string(),
              amount: z.string(),
              referenceNo: z.string(),
              identityNo: z.string(),
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

export type PostRedeemCodeRequest = RequestUnion<
  any,
  any,
  {
    code: string;
    externalUid?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostRedeemCodeResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          code: string;
          message: string;
          data: {
            token: string;
            amount: string;
            referenceNo: string;
            identityNo: string;
          };
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostRedeemCodeRequestResult = RequestResult<
  PostRedeemCodeRequest,
  PostRedeemCodeResponse
>;

export function postRedeemCode(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostRedeemCodeRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostRedeemCodeRequestResult> {
  return requestHandler.execute(
    createRequest(postRedeemCodeEndpointSchema, payload),
    config
  );
}

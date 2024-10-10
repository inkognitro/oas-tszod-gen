import {z_Error, Error} from '../../../../../../';
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
} from '../../../../../../core';

export const postStatusEndpointSchema = {
  path: '/sapi/v1/dci/product/auto_compound/edit-status',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    positionId: z.number().int().safe().finite(),
    autoCompoundPlan: z.enum(['NONE', 'STANDARD', 'ADVANCE']),
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
            positionId: z.string(),
            autoCompoundPlan: z.string(),
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

export type PostStatusRequest = RequestUnion<
  any,
  any,
  {
    positionId: number; // int
    autoCompoundPlan: 'NONE' | 'STANDARD' | 'ADVANCE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          positionId: string;
          autoCompoundPlan: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostStatusRequestResult = RequestResult<
  PostStatusRequest,
  PostStatusResponse
>;

export function postStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostStatusRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostStatusRequestResult> {
  return requestHandler.execute(
    createRequest(postStatusEndpointSchema, payload),
    config
  );
}

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

export const postRedeemEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/redeem',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    indexId: z.number().int().safe().finite(),
    requestId: z.string().optional(),
    redemptionPercentage: z.number().int().safe().finite(),
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
            redemptionId: z.number().int().safe().finite(),
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

export type PostRedeemRequest = RequestUnion<
  any,
  any,
  {
    indexId: number; // int
    requestId?: string;
    redemptionPercentage: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostRedeemResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          redemptionId: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostRedeemRequestResult = RequestResult<
  PostRedeemRequest,
  PostRedeemResponse
>;

export function postRedeem(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostRedeemRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostRedeemRequestResult> {
  return requestHandler.execute(
    createRequest(postRedeemEndpointSchema, payload),
    config
  );
}

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

export const postOffEndpointSchema = {
  path: '/sapi/v1/lending/auto-invest/one-off',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    sourceType: z.string(),
    requestId: z.string().optional(),
    subscriptionAmount: z.number().safe().finite(),
    sourceAsset: z.string(),
    flexibleAllowedToUse: z.boolean().optional(),
    planId: z.number().int().safe().finite().optional(),
    indexId: z.number().int().safe().finite().optional(),
    details: z
      .array(
        z.object({
          targetAsset: z.string().optional(),
          percentage: z.number().int().safe().finite().optional(),
        })
      )
      .optional(),
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
            transactionId: z.number().int().safe().finite(),
            waitSecond: z.number().int().safe().finite(),
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

export type PostOffRequest = RequestUnion<
  any,
  any,
  {
    sourceType: string;
    requestId?: string;
    subscriptionAmount: number;
    sourceAsset: string;
    flexibleAllowedToUse?: boolean;
    planId?: number; // int
    indexId?: number; // int
    details?: {
      targetAsset?: string;
      percentage?: number; // int
    }[];
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostOffResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          transactionId: number; // int
          waitSecond: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostOffRequestResult = RequestResult<
  PostOffRequest,
  PostOffResponse
>;

export function postOff(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostOffRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostOffRequestResult> {
  return requestHandler.execute(
    createRequest(postOffEndpointSchema, payload),
    config
  );
}

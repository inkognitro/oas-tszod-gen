import {z_Error, Error} from '../../../../';
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
} from '../../../../core';

export const postLeverageEndpointSchema = {
  path: '/sapi/v1/margin/max-leverage',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    maxLeverage: z.number().int().safe().finite(),
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

export type PostLeverageRequest = RequestUnion<
  any,
  any,
  {
    maxLeverage: number; // int
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostLeverageResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          success: boolean;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostLeverageRequestResult = RequestResult<
  PostLeverageRequest,
  PostLeverageResponse
>;

export function postLeverage(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostLeverageRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostLeverageRequestResult> {
  return requestHandler.execute(
    createRequest(postLeverageEndpointSchema, payload),
    config
  );
}

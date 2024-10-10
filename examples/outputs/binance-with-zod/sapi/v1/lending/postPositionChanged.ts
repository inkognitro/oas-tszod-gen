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

export const postPositionChangedEndpointSchema = {
  path: '/sapi/v1/lending/positionChanged',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    projectId: z.string(),
    lot: z.string(),
    positionId: z.string().optional(),
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
            dailyPurchaseId: z.number().int().safe().finite(),
            success: z.boolean(),
            time: z.number().int().safe().finite(),
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

export type PostPositionChangedRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    lot: string;
    positionId?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type PostPositionChangedResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          dailyPurchaseId: number; // int
          success: boolean;
          time: number; // int
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type PostPositionChangedRequestResult = RequestResult<
  PostPositionChangedRequest,
  PostPositionChangedResponse
>;

export function postPositionChanged(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<PostPositionChangedRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<PostPositionChangedRequestResult> {
  return requestHandler.execute(
    createRequest(postPositionChangedEndpointSchema, payload),
    config
  );
}

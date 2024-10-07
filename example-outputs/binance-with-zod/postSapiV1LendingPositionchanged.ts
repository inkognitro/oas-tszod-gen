import {z_Error, Error} from '@example-outputs/binance-with-zod';
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
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1LendingPositionchangedEndpointSchema = {
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

export type PostSapiV1LendingPositionchangedRequest = RequestUnion<
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

export type PostSapiV1LendingPositionchangedResponse =
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

export type PostSapiV1LendingPositionchangedRequestResult = RequestResult<
  PostSapiV1LendingPositionchangedRequest,
  PostSapiV1LendingPositionchangedResponse
>;

export function postSapiV1LendingPositionchanged(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1LendingPositionchangedRequest,
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1LendingPositionchangedRequestResult> {
  return requestHandler.execute(
    createRequest(postSapiV1LendingPositionchangedEndpointSchema, payload),
    config
  );
}

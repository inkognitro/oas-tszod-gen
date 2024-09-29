import {errorZodSchema, Error} from '@example-outputs/binance-with-zod';
import {z} from 'zod';
import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/binance-with-zod/core';

export const postSapiV1DciProductAuto_compoundEditStatusEndpointSchema = {
  path: '/sapi/v1/dci/product/auto_compound/edit-status',
  method: 'post',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', requiredPermissions: []}],
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
          zodSchema: errorZodSchema,
        },
      },
    },
    '401': {
      bodyByContentType: {
        'application/json': {
          zodSchema: errorZodSchema,
        },
      },
    },
  },
};

export type PostSapiV1DciProductAuto_compoundEditStatusPayload = {
  queryParams: {
    positionId: number; // int
    autoCompoundPlan: 'NONE' | 'STANDARD' | 'ADVANCE';
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  };
};

export type PostSapiV1DciProductAuto_compoundEditStatusResponse =
  | Response<
      200,
      ResponseBodyData<
        'application/json',
        {
          positionId: string;
          autoCompoundPlan: string;
        }
      >
    >
  | Response<400, ResponseBodyData<'application/json', Error>>
  | Response<401, ResponseBodyData<'application/json', Error>>;

export type PostSapiV1DciProductAuto_compoundEditStatusRequestResult =
  RequestResult<Request, PostSapiV1DciProductAuto_compoundEditStatusResponse>;

export function postSapiV1DciProductAuto_compoundEditStatus(
  requestHandler: SimpleRequestHandler,
  payload: PostSapiV1DciProductAuto_compoundEditStatusPayload,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1DciProductAuto_compoundEditStatusRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: postSapiV1DciProductAuto_compoundEditStatusEndpointSchema,
    }),
    config
  );
}

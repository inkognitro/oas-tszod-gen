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

export const postSapiV1DciProductAuto_compoundEditStatusEndpointSchema = {
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

export type PostSapiV1DciProductAuto_compoundEditStatusRequest = RequestUnion<
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

export type PostSapiV1DciProductAuto_compoundEditStatusResponse =
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

export type PostSapiV1DciProductAuto_compoundEditStatusRequestResult =
  RequestResult<
    PostSapiV1DciProductAuto_compoundEditStatusRequest,
    PostSapiV1DciProductAuto_compoundEditStatusResponse
  >;

export function postSapiV1DciProductAuto_compoundEditStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    PostSapiV1DciProductAuto_compoundEditStatusRequest,
    'queryParams',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<PostSapiV1DciProductAuto_compoundEditStatusRequestResult> {
  return requestHandler.execute(
    createRequest(
      postSapiV1DciProductAuto_compoundEditStatusEndpointSchema,
      payload
    ),
    config
  );
}

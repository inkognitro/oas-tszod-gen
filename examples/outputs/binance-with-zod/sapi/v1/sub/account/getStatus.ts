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

export const getStatusEndpointSchema = {
  path: '/sapi/v1/sub-account/status',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    email: z.string().optional(),
    recvWindow: z.number().int().safe().finite().optional(),
    timestamp: z.number().int().safe().finite(),
    signature: z.string(),
  }),
  bodyByContentType: {},
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z.array(
            z.object({
              email: z.string(),
              isSubUserEnabled: z.boolean(),
              isUserActive: z.boolean(),
              insertTime: z.number().int().safe().finite(),
              isMarginEnabled: z.boolean(),
              isFutureEnabled: z.boolean(),
              mobile: z.number().int().safe().finite(),
            })
          ),
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

export type GetStatusRequest = RequestUnion<
  any,
  any,
  {
    email?: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetStatusResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          email: string;
          isSubUserEnabled: boolean;
          isUserActive: boolean;
          insertTime: number; // int
          isMarginEnabled: boolean;
          isFutureEnabled: boolean;
          mobile: number; // int
        }[]
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetStatusRequestResult = RequestResult<
  GetStatusRequest,
  GetStatusResponse
>;

export function getStatus(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetStatusRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetStatusRequestResult> {
  return requestHandler.execute(
    createRequest(getStatusEndpointSchema, payload),
    config
  );
}

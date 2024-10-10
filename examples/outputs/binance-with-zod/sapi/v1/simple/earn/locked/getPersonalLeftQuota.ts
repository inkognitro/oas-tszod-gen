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

export const getPersonalLeftQuotaEndpointSchema = {
  path: '/sapi/v1/simple-earn/locked/personalLeftQuota',
  method: 'get',
  supportedSecuritySchemas: [{name: 'ApiKeyAuth', scopes: []}],
  queryParamsZodSchema: z.object({
    projectId: z.string(),
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
            leftPersonalQuota: z.string(),
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

export type GetPersonalLeftQuotaRequest = RequestUnion<
  any,
  any,
  {
    projectId: string;
    recvWindow?: number; // int
    timestamp: number; // int
    signature: string;
  }
>;

export type GetPersonalLeftQuotaResponse =
  | ResponseUnion<
      200,
      ResponseBodyData<
        'application/json',
        {
          leftPersonalQuota: string;
        }
      >
    >
  | ResponseUnion<400, ResponseBodyData<'application/json', Error>>
  | ResponseUnion<401, ResponseBodyData<'application/json', Error>>;

export type GetPersonalLeftQuotaRequestResult = RequestResult<
  GetPersonalLeftQuotaRequest,
  GetPersonalLeftQuotaResponse
>;

export function getPersonalLeftQuota(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<GetPersonalLeftQuotaRequest, 'queryParams', never>,
  config?: RequestHandlerExecutionConfig
): Promise<GetPersonalLeftQuotaRequestResult> {
  return requestHandler.execute(
    createRequest(getPersonalLeftQuotaEndpointSchema, payload),
    config
  );
}

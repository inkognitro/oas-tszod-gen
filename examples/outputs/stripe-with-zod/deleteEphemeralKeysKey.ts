import {z_Ephemeral_key, z_Error, Ephemeral_key, Error} from './schemas';
import {z} from 'zod';
import {
  RequestUnion,
  RequestBodyData,
  ResponseBodyData,
  ResponseUnion,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

export const deleteEphemeralKeysKeyEndpointSchema = {
  path: '/v1/ephemeral_keys/{key}',
  method: 'delete',
  supportedSecuritySchemas: [],
  pathParamsZodSchema: z.object({
    key: z.string(),
  }),
  bodyByContentType: {
    'application/x-www-form-urlencoded': {
      zodSchema: z.object({
        expand: z.array(z.string()).optional(),
      }),
    },
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Ephemeral_key,
        },
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {
          zodSchema: z_Error,
        },
      },
    },
  },
};

export type DeleteEphemeralKeysKeyRequest = RequestUnion<
  RequestBodyData<
    'application/x-www-form-urlencoded',
    {
      expand?: string[];
    }
  >,
  {
    key: string;
  }
>;

export type DeleteEphemeralKeysKeyResponse =
  | ResponseUnion<200, ResponseBodyData<'application/json', Ephemeral_key>>
  | ResponseUnion<any, ResponseBodyData<'application/json', Error>>;

export type DeleteEphemeralKeysKeyRequestResult = RequestResult<
  DeleteEphemeralKeysKeyRequest,
  DeleteEphemeralKeysKeyResponse
>;

export function deleteEphemeralKeysKey(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    DeleteEphemeralKeysKeyRequest,
    'pathParams' | 'contentType' | 'body',
    never
  >,
  config?: RequestHandlerExecutionConfig
): Promise<DeleteEphemeralKeysKeyRequestResult> {
  return requestHandler.execute(
    createRequest(deleteEphemeralKeysKeyEndpointSchema, payload),
    config
  );
}

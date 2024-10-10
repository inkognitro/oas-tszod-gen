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
import {Ephemeral_key, Error} from './schemas';

export const deleteEphemeralKeysKeyEndpointSchema = {
  path: '/v1/ephemeral_keys/{key}',
  method: 'delete',
  supportedSecuritySchemas: [],
  bodyByContentType: {
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/json': {},
      },
    },
    default: {
      bodyByContentType: {
        'application/json': {},
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

import {Pet} from '@example-outputs/petstore2';
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
} from '@example-outputs/petstore2/core';

export const addPetEndpointSchema = {
  path: '/pet',
  method: 'post',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {
    'application/json': {},
    'application/xml': {},
    'application/x-www-form-urlencoded': {},
  },
  responseByStatus: {
    '200': {
      bodyByContentType: {
        'application/xml': {},
        'application/json': {},
      },
    },
    '405': {
      bodyByContentType: {},
    },
  },
};

export type AddPetRequest = RequestUnion<
  | RequestBodyData<'application/json', Pet>
  | RequestBodyData<'application/xml', Pet>
  | RequestBodyData<'application/x-www-form-urlencoded', Pet>
>;

export type AddPetResponse =
  | ResponseUnion<
      200,
      | ResponseBodyData<'application/xml', Pet>
      | ResponseBodyData<'application/json', Pet>
    >
  | ResponseUnion<405>;

export type AddPetRequestResult = RequestResult<AddPetRequest, AddPetResponse>;

export function addPet(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<AddPetRequest, 'contentType' | 'body'>,
  config?: RequestHandlerExecutionConfig
): Promise<AddPetRequestResult> {
  return requestHandler.execute(
    createRequest(addPetEndpointSchema, payload),
    config
  );
}

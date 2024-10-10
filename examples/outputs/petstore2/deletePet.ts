import {
  RequestUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

export const deletePetEndpointSchema = {
  path: '/pet/{petId}',
  method: 'delete',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {},
  responseByStatus: {
    '400': {
      bodyByContentType: {},
    },
  },
};

export type DeletePetRequest = RequestUnion<
  any,
  {
    petId: number; // int
  },
  any,
  {
    api_key?: string;
  }
>;

export type DeletePetResponse = Response<400>;

export type DeletePetRequestResult = RequestResult<
  DeletePetRequest,
  DeletePetResponse
>;

export function deletePet(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<DeletePetRequest, 'pathParams', 'headers'>,
  config?: RequestHandlerExecutionConfig
): Promise<DeletePetRequestResult> {
  return requestHandler.execute(
    createRequest(deletePetEndpointSchema, payload),
    config
  );
}

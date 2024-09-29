import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const deletePetEndpointSchema = {
  path: '/pet/{petId}',
  method: 'delete',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {},
  responseByStatus: {
    '400': {
      bodyByContentType: {},
    },
  },
};

export type DeletePetPayload = {
  pathParams: {
    petId: number; // int
  };
  headers: {
    api_key?: string;
  };
};

export type DeletePetResponse = Response<400>;

export type DeletePetRequestResult = RequestResult<Request, DeletePetResponse>;

export function deletePet(
  requestHandler: SimpleRequestHandler,
  payload: DeletePetPayload,
  config?: RequestHandlerExecutionConfig
): Promise<DeletePetRequestResult> {
  return requestHandler.execute(
    createRequest({...payload, endpointSchema: deletePetEndpointSchema}),
    config
  );
}

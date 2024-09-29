import {
  ResponseBodyData,
  Response,
  RequestResult,
  Request,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
} from '@example-outputs/petstore2/core';

export const updatePetWithFormEndpointSchema = {
  path: '/pet/{petId}',
  method: 'post',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {},
  responseByStatus: {
    '405': {
      bodyByContentType: {},
    },
  },
};

export type UpdatePetWithFormPayload = {
  queryParams: {
    name?: string;
    status?: string;
  };
  pathParams: {
    petId: number; // int
  };
};

export type UpdatePetWithFormResponse = Response<405>;

export type UpdatePetWithFormRequestResult = RequestResult<
  Request,
  UpdatePetWithFormResponse
>;

export function updatePetWithForm(
  requestHandler: SimpleRequestHandler,
  payload: UpdatePetWithFormPayload,
  config?: RequestHandlerExecutionConfig
): Promise<UpdatePetWithFormRequestResult> {
  return requestHandler.execute(
    createRequest({
      ...payload,
      endpointSchema: updatePetWithFormEndpointSchema,
    }),
    config
  );
}

import {
  RequestUnion,
  Response,
  RequestResult,
  SimpleRequestHandler,
  createRequest,
  RequestHandlerExecutionConfig,
  RequestPayload,
} from './core';

export const updatePetWithFormEndpointSchema = {
  path: '/pet/{petId}',
  method: 'post',
  supportedSecuritySchemas: [
    {name: 'petstore_auth', scopes: ['write:pets', 'read:pets']},
  ],
  bodyByContentType: {},
  responseByStatus: {
    '405': {
      bodyByContentType: {},
    },
  },
};

export type UpdatePetWithFormRequest = RequestUnion<
  any,
  {
    petId: number; // int
  },
  {
    name?: string;
    status?: string;
  }
>;

export type UpdatePetWithFormResponse = Response<405>;

export type UpdatePetWithFormRequestResult = RequestResult<
  UpdatePetWithFormRequest,
  UpdatePetWithFormResponse
>;

export function updatePetWithForm(
  requestHandler: SimpleRequestHandler,
  payload: RequestPayload<
    UpdatePetWithFormRequest,
    'pathParams',
    'queryParams'
  >,
  config?: RequestHandlerExecutionConfig
): Promise<UpdatePetWithFormRequestResult> {
  return requestHandler.execute(
    createRequest(updatePetWithFormEndpointSchema, payload),
    config
  );
}

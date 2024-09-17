import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore2/core';

export const updatePetWithFormEndpointSchema = {
path: '/pet/{petId}', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']}], 
bodyByContentType: {}, 
responseByStatus: {
'405': {
bodyByContentType: {}
}
}
}

export type UpdatePetWithFormPayload = {
'queryParams': {
'name'?: string;
'status'?: string;
};
'pathParams': {
'petId': number; // int
};
}

export type UpdatePetWithFormResponse = Response<405, any>

export type UpdatePetWithFormRequestResult = RequestResult<Request, UpdatePetWithFormResponse>

export function updatePetWithForm(requestHandler: RequestHandler, payload: UpdatePetWithFormPayload, config?: RequestHandlerExecutionConfig): Promise<UpdatePetWithFormRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: updatePetWithFormEndpointSchema}), config);}
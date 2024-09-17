import {Pet} from '@/test-outputs/petstore2';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore2/core';

export const addPetEndpointSchema = {
path: '/pet', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']}], 
bodyByContentType: {
'application/json': {

},
'application/xml': {

},
'application/x-www-form-urlencoded': {

}
}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/xml': {

},
'application/json': {

}
}
},
'405': {
bodyByContentType: {}
}
}
}

export type AddPetRequestBody = {
contentType: 'application/json',
body: Pet
} | {
contentType: 'application/xml',
body: Pet
} | {
contentType: 'application/x-www-form-urlencoded',
body: Pet
}

export type AddPetPayload = AddPetRequestBody

export type AddPetResponse = Response<200, ResponseData<ResponseBodyData<'application/xml', Pet> | ResponseBodyData<'application/json', Pet>>> | Response<405, any>

export type AddPetRequestResult = RequestResult<Request, AddPetResponse>

export function addPet(requestHandler: RequestHandler, payload: AddPetPayload, config?: RequestHandlerExecutionConfig): Promise<AddPetRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: addPetEndpointSchema}), config);}
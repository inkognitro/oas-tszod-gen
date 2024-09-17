import {Pet} from '@/test-outputs/petstore2';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore2/core';

export const getPetByIdEndpointSchema = {
path: '/pet/{petId}', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'api_key', requiredPermissions: []}, { name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/xml': {

},
'application/json': {

}
}
},
'400': {
bodyByContentType: {}
},
'404': {
bodyByContentType: {}
}
}
}

export type GetPetByIdPayload = {
'pathParams': {
'petId': number; // int
};
}

export type GetPetByIdResponse = Response<200, ResponseData<ResponseBodyData<'application/xml', Pet> | ResponseBodyData<'application/json', Pet>>> | Response<400, any> | Response<404, any>

export type GetPetByIdRequestResult = RequestResult<Request, GetPetByIdResponse>

export function getPetById(requestHandler: RequestHandler, payload: GetPetByIdPayload, config?: RequestHandlerExecutionConfig): Promise<GetPetByIdRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getPetByIdEndpointSchema}), config);}
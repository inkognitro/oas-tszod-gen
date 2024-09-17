import {petZodSchema, Pet} from '@/test-outputs/petstore2-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore2-with-zod/core';

export const getPetByIdEndpointSchema = {
path: '/pet/{petId}', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'api_key', requiredPermissions: []}, { name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']}], 
pathParamsZodSchema: z.object({
'petId': z.number().int().safe().finite(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/xml': {
zodSchema: petZodSchema
},
'application/json': {
zodSchema: petZodSchema
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
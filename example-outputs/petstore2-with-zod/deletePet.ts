import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore2-with-zod/core';

export const deletePetEndpointSchema = {
path: '/pet/{petId}', 
method: 'delete', 
supportedSecuritySchemas: [{ name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']}], 
pathParamsZodSchema: z.object({
'petId': z.number().int().safe().finite(),
}), 
headersZodSchema: z.object({
'api_key': z.string().optional(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'400': {
bodyByContentType: {}
}
}
}

export type DeletePetPayload = {
'pathParams': {
'petId': number; // int
};
'headers': {
'api_key'?: string;
};
}

export type DeletePetResponse = Response<400, any>

export type DeletePetRequestResult = RequestResult<Request, DeletePetResponse>

export function deletePet(requestHandler: RequestHandler, payload: DeletePetPayload, config?: RequestHandlerExecutionConfig): Promise<DeletePetRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: deletePetEndpointSchema}), config);}
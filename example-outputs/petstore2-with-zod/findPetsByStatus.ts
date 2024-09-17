import {petZodSchema, Pet} from '@/test-outputs/petstore2-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore2-with-zod/core';

export const findPetsByStatusEndpointSchema = {
path: '/pet/findByStatus', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'petstore_auth', requiredPermissions: ['write:pets', 'read:pets']}], 
queryParamsZodSchema: z.object({
'status': z.union([z.literal('available'),z.literal('pending'),z.literal('sold')]).optional(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/xml': {
zodSchema: z.array(petZodSchema)
},
'application/json': {
zodSchema: z.array(petZodSchema)
}
}
},
'400': {
bodyByContentType: {}
}
}
}

export type FindPetsByStatusPayload = {
'queryParams': {
'status'?: 'available' | 'pending' | 'sold';
};
}

export type FindPetsByStatusResponse = Response<200, ResponseData<ResponseBodyData<'application/xml', (Pet)[]> | ResponseBodyData<'application/json', (Pet)[]>>> | Response<400, any>

export type FindPetsByStatusRequestResult = RequestResult<Request, FindPetsByStatusResponse>

export function findPetsByStatus(requestHandler: RequestHandler, payload: FindPetsByStatusPayload, config?: RequestHandlerExecutionConfig): Promise<FindPetsByStatusRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: findPetsByStatusEndpointSchema}), config);}
import {$200OkDrsObjectResponse, $202AcceptedResponse, $400BadRequestResponse, $401UnauthorizedResponse, $403ForbiddenResponse, $404NotFoundAccessResponse, $500InternalServerErrorResponse} from '@/test-outputs/petstore1-with-zod';
import {z} from 'zod';
import {Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore1-with-zod/core';

export const postObjectEndpointSchema = {
path: '/objects/{object_id}', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'PassportAuth', requiredPermissions: []}], 
pathParamsZodSchema: z.object({
'object_id': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': $200OkDrsObjectResponse,
'202': $202AcceptedResponse,
'400': $400BadRequestResponse,
'401': $401UnauthorizedResponse,
'403': $403ForbiddenResponse,
'404': $404NotFoundAccessResponse,
'500': $500InternalServerErrorResponse
}
}

export type PostObjectPayload = {
'pathParams': {
'object_id': string;
};
}

export type PostObjectResponse = Response<200, $200OkDrsObjectResponse> | Response<202, $202AcceptedResponse> | Response<400, $400BadRequestResponse> | Response<401, $401UnauthorizedResponse> | Response<403, $403ForbiddenResponse> | Response<404, $404NotFoundAccessResponse> | Response<500, $500InternalServerErrorResponse>

export type PostObjectRequestResult = RequestResult<Request, PostObjectResponse>

export function postObject(requestHandler: RequestHandler, payload: PostObjectPayload, config?: RequestHandlerExecutionConfig): Promise<PostObjectRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postObjectEndpointSchema}), config);}
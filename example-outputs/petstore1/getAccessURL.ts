import {$200OkAccessResponse, $202AcceptedResponse, $400BadRequestResponse, $401UnauthorizedResponse, $403ForbiddenResponse, $404NotFoundAccessResponse, $500InternalServerErrorResponse} from '@/test-outputs/petstore1';
import {Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore1/core';

export const getAccessURLEndpointSchema = {
path: '/objects/{object_id}/access/{access_id}', 
method: 'get', 
supportedSecuritySchemas: [], 
bodyByContentType: {}, 
responseByStatus: {
'200': $200OkAccessResponse,
'202': $202AcceptedResponse,
'400': $400BadRequestResponse,
'401': $401UnauthorizedResponse,
'403': $403ForbiddenResponse,
'404': $404NotFoundAccessResponse,
'500': $500InternalServerErrorResponse
}
}

export type GetAccessURLPayload = {
'pathParams': {
'object_id': string;
'access_id': string;
};
}

export type GetAccessURLResponse = Response<200, $200OkAccessResponse> | Response<202, $202AcceptedResponse> | Response<400, $400BadRequestResponse> | Response<401, $401UnauthorizedResponse> | Response<403, $403ForbiddenResponse> | Response<404, $404NotFoundAccessResponse> | Response<500, $500InternalServerErrorResponse>

export type GetAccessURLRequestResult = RequestResult<Request, GetAccessURLResponse>

export function getAccessURL(requestHandler: RequestHandler, payload: GetAccessURLPayload, config?: RequestHandlerExecutionConfig): Promise<GetAccessURLRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getAccessURLEndpointSchema}), config);}
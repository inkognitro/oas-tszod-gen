import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/petstore2-with-zod/core';

export const logoutUserEndpointSchema = {
path: '/user/logout', 
method: 'get', 
supportedSecuritySchemas: [], 
bodyByContentType: {}, 
responseByStatus: {
'default': {
bodyByContentType: {}
}
}
}

export type LogoutUserResponse = Response<any, any>

export type LogoutUserRequestResult = RequestResult<Request, LogoutUserResponse>

export function logoutUser(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<LogoutUserRequestResult> {return requestHandler.execute(createRequest({endpointSchema: logoutUserEndpointSchema}), config);}
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postApiV3UserdatastreamEndpointSchema = {
path: '/api/v3/userDataStream', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'listenKey': z.string(),
})
}
}
}
}
}

export type PostApiV3UserdatastreamResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'listenKey': string;
}>>>

export type PostApiV3UserdatastreamRequestResult = RequestResult<Request, PostApiV3UserdatastreamResponse>

export function postApiV3Userdatastream(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<PostApiV3UserdatastreamRequestResult> {return requestHandler.execute(createRequest({endpointSchema: postApiV3UserdatastreamEndpointSchema}), config);}
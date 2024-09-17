import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1UserdatastreamIsolatedEndpointSchema = {
path: '/sapi/v1/userDataStream/isolated', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type PostSapiV1UserdatastreamIsolatedResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'listenKey': string;
}>>>

export type PostSapiV1UserdatastreamIsolatedRequestResult = RequestResult<Request, PostSapiV1UserdatastreamIsolatedResponse>

export function postSapiV1UserdatastreamIsolated(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1UserdatastreamIsolatedRequestResult> {return requestHandler.execute(createRequest({endpointSchema: postSapiV1UserdatastreamIsolatedEndpointSchema}), config);}
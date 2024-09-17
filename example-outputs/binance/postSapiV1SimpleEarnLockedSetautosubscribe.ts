import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1SimpleEarnLockedSetautosubscribeEndpointSchema = {
path: '/sapi/v1/simple-earn/locked/setAutoSubscribe', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {

}
}
},
'400': {
bodyByContentType: {
'application/json': {

}
}
},
'401': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type PostSapiV1SimpleEarnLockedSetautosubscribePayload = {
'queryParams': {
'positionId': string;
'autoSubscribe': boolean;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SimpleEarnLockedSetautosubscribeResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SimpleEarnLockedSetautosubscribeRequestResult = RequestResult<Request, PostSapiV1SimpleEarnLockedSetautosubscribeResponse>

export function postSapiV1SimpleEarnLockedSetautosubscribe(requestHandler: RequestHandler, payload: PostSapiV1SimpleEarnLockedSetautosubscribePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SimpleEarnLockedSetautosubscribeRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SimpleEarnLockedSetautosubscribeEndpointSchema}), config);}
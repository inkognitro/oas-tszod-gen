import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1SimpleEarnFlexibleSetautosubscribeEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/setAutoSubscribe', 
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

export type PostSapiV1SimpleEarnFlexibleSetautosubscribePayload = {
'queryParams': {
'productId': string;
'autoSubscribe': boolean;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SimpleEarnFlexibleSetautosubscribeResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SimpleEarnFlexibleSetautosubscribeRequestResult = RequestResult<Request, PostSapiV1SimpleEarnFlexibleSetautosubscribeResponse>

export function postSapiV1SimpleEarnFlexibleSetautosubscribe(requestHandler: RequestHandler, payload: PostSapiV1SimpleEarnFlexibleSetautosubscribePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SimpleEarnFlexibleSetautosubscribeRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SimpleEarnFlexibleSetautosubscribeEndpointSchema}), config);}
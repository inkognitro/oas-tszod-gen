import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1AccountDisablefastwithdrawswitchEndpointSchema = {
path: '/sapi/v1/account/disableFastWithdrawSwitch', 
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

export type PostSapiV1AccountDisablefastwithdrawswitchPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1AccountDisablefastwithdrawswitchResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {

}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1AccountDisablefastwithdrawswitchRequestResult = RequestResult<Request, PostSapiV1AccountDisablefastwithdrawswitchResponse>

export function postSapiV1AccountDisablefastwithdrawswitch(requestHandler: RequestHandler, payload: PostSapiV1AccountDisablefastwithdrawswitchPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1AccountDisablefastwithdrawswitchRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1AccountDisablefastwithdrawswitchEndpointSchema}), config);}
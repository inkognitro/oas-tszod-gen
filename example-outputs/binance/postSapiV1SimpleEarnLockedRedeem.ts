import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1SimpleEarnLockedRedeemEndpointSchema = {
path: '/sapi/v1/simple-earn/locked/redeem', 
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

export type PostSapiV1SimpleEarnLockedRedeemPayload = {
'queryParams': {
'positionId': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SimpleEarnLockedRedeemResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'redeemId': number; // int
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SimpleEarnLockedRedeemRequestResult = RequestResult<Request, PostSapiV1SimpleEarnLockedRedeemResponse>

export function postSapiV1SimpleEarnLockedRedeem(requestHandler: RequestHandler, payload: PostSapiV1SimpleEarnLockedRedeemPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SimpleEarnLockedRedeemRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SimpleEarnLockedRedeemEndpointSchema}), config);}
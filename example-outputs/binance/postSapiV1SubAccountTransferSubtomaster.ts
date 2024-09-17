import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1SubAccountTransferSubtomasterEndpointSchema = {
path: '/sapi/v1/sub-account/transfer/subToMaster', 
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

export type PostSapiV1SubAccountTransferSubtomasterPayload = {
'queryParams': {
'asset': string;
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SubAccountTransferSubtomasterResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'txnId': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SubAccountTransferSubtomasterRequestResult = RequestResult<Request, PostSapiV1SubAccountTransferSubtomasterResponse>

export function postSapiV1SubAccountTransferSubtomaster(requestHandler: RequestHandler, payload: PostSapiV1SubAccountTransferSubtomasterPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SubAccountTransferSubtomasterRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SubAccountTransferSubtomasterEndpointSchema}), config);}
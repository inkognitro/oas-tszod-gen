import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1SubAccountMarginTransferEndpointSchema = {
path: '/sapi/v1/sub-account/margin/transfer', 
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

export type PostSapiV1SubAccountMarginTransferPayload = {
'queryParams': {
'email': string;
'asset': string;
'amount': number;
'type': number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SubAccountMarginTransferResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'txnId': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SubAccountMarginTransferRequestResult = RequestResult<Request, PostSapiV1SubAccountMarginTransferResponse>

export function postSapiV1SubAccountMarginTransfer(requestHandler: RequestHandler, payload: PostSapiV1SubAccountMarginTransferPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SubAccountMarginTransferRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SubAccountMarginTransferEndpointSchema}), config);}
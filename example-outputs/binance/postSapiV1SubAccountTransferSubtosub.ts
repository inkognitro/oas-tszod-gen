import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1SubAccountTransferSubtosubEndpointSchema = {
path: '/sapi/v1/sub-account/transfer/subToSub', 
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

export type PostSapiV1SubAccountTransferSubtosubPayload = {
'queryParams': {
'toEmail': string;
'asset': string;
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SubAccountTransferSubtosubResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'txnId': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SubAccountTransferSubtosubRequestResult = RequestResult<Request, PostSapiV1SubAccountTransferSubtosubResponse>

export function postSapiV1SubAccountTransferSubtosub(requestHandler: RequestHandler, payload: PostSapiV1SubAccountTransferSubtosubPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SubAccountTransferSubtosubRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SubAccountTransferSubtosubEndpointSchema}), config);}
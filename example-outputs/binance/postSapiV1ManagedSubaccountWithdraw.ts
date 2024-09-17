import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1ManagedSubaccountWithdrawEndpointSchema = {
path: '/sapi/v1/managed-subaccount/withdraw', 
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

export type PostSapiV1ManagedSubaccountWithdrawPayload = {
'queryParams': {
'fromEmail': string;
'asset': string;
'amount': number;
'transferDate'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1ManagedSubaccountWithdrawResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'tranId': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1ManagedSubaccountWithdrawRequestResult = RequestResult<Request, PostSapiV1ManagedSubaccountWithdrawResponse>

export function postSapiV1ManagedSubaccountWithdraw(requestHandler: RequestHandler, payload: PostSapiV1ManagedSubaccountWithdrawPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1ManagedSubaccountWithdrawRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1ManagedSubaccountWithdrawEndpointSchema}), config);}
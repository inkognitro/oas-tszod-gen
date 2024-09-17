import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1CapitalDepositCreditApplyEndpointSchema = {
path: '/sapi/v1/capital/deposit/credit-apply', 
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

export type PostSapiV1CapitalDepositCreditApplyPayload = {
'queryParams': {
'depositId'?: number; // int
'txId'?: string;
'subAccountId'?: number; // int
'subUserId'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1CapitalDepositCreditApplyResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': string;
'message': string;
'data': boolean;
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1CapitalDepositCreditApplyRequestResult = RequestResult<Request, PostSapiV1CapitalDepositCreditApplyResponse>

export function postSapiV1CapitalDepositCreditApply(requestHandler: RequestHandler, payload: PostSapiV1CapitalDepositCreditApplyPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1CapitalDepositCreditApplyRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1CapitalDepositCreditApplyEndpointSchema}), config);}
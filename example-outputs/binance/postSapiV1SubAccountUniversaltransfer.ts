import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1SubAccountUniversaltransferEndpointSchema = {
path: '/sapi/v1/sub-account/universalTransfer', 
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

export type PostSapiV1SubAccountUniversaltransferPayload = {
'queryParams': {
'fromEmail'?: string;
'toEmail'?: string;
'fromAccountType': 'SPOT' | 'USDT_FUTURE' | 'COIN_FUTURE' | 'MARGIN' | 'ISOLATED_MARGIN';
'toAccountType': 'SPOT' | 'USDT_FUTURE' | 'COIN_FUTURE' | 'MARGIN' | 'ISOLATED_MARGIN';
'clientTranId'?: string;
'symbol'?: string;
'asset': string;
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SubAccountUniversaltransferResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'tranId': number; // int
'clientTranId': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SubAccountUniversaltransferRequestResult = RequestResult<Request, PostSapiV1SubAccountUniversaltransferResponse>

export function postSapiV1SubAccountUniversaltransfer(requestHandler: RequestHandler, payload: PostSapiV1SubAccountUniversaltransferPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SubAccountUniversaltransferRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SubAccountUniversaltransferEndpointSchema}), config);}
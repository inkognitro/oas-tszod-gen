import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1SubAccountTransferSubuserhistoryEndpointSchema = {
path: '/sapi/v1/sub-account/transfer/subUserHistory', 
method: 'get', 
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

export type GetSapiV1SubAccountTransferSubuserhistoryPayload = {
'queryParams': {
'asset'?: string;
'type'?: number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SubAccountTransferSubuserhistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'counterParty': string;
'email': string;
'type': number; // int
'asset': string;
'qty': string;
'fromAccountType': string;
'toAccountType': string;
'status': string;
'tranId': number; // int
'time': number; // int
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SubAccountTransferSubuserhistoryRequestResult = RequestResult<Request, GetSapiV1SubAccountTransferSubuserhistoryResponse>

export function getSapiV1SubAccountTransferSubuserhistory(requestHandler: RequestHandler, payload: GetSapiV1SubAccountTransferSubuserhistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SubAccountTransferSubuserhistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SubAccountTransferSubuserhistoryEndpointSchema}), config);}
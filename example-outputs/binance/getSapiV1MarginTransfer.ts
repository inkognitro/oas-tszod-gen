import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginTransferEndpointSchema = {
path: '/sapi/v1/margin/transfer', 
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

export type GetSapiV1MarginTransferPayload = {
'queryParams': {
'asset'?: string;
'type'?: 'ROLL_IN' | 'ROLL_OUT';
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
'isolatedSymbol'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginTransferResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'amount': string;
'asset': string;
'status': string;
'timestamp': number; // int
'txId': number; // int
'type': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginTransferRequestResult = RequestResult<Request, GetSapiV1MarginTransferResponse>

export function getSapiV1MarginTransfer(requestHandler: RequestHandler, payload: GetSapiV1MarginTransferPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginTransferRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginTransferEndpointSchema}), config);}
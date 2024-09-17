import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1NftHistoryTransactionsEndpointSchema = {
path: '/sapi/v1/nft/history/transactions', 
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

export type GetSapiV1NftHistoryTransactionsPayload = {
'queryParams': {
'orderType': number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'limit'?: number; // int
'page'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1NftHistoryTransactionsResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'total': number; // int
'list': ({
'orderNo': string;
'tokens': ({
'network': string;
'tokenId': string;
'contractAddress': string;
})[];
'tradeTime': number; // int
'tradeAmount': string;
'tradeCurrency': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1NftHistoryTransactionsRequestResult = RequestResult<Request, GetSapiV1NftHistoryTransactionsResponse>

export function getSapiV1NftHistoryTransactions(requestHandler: RequestHandler, payload: GetSapiV1NftHistoryTransactionsPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1NftHistoryTransactionsRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1NftHistoryTransactionsEndpointSchema}), config);}
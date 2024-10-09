import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getHistoryEndpointSchema = {
path: '/sapi/v1/sub-account/sub/transfer/history', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', scopes: []}], 
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

export type GetHistoryRequest = RequestUnion<any,
any,
{
'fromEmail'?: string;
'toEmail'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'page'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetHistoryResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'from': string;
'to': string;
'asset': string;
'qty': string;
'status': string;
'tranId': number; // int
'time': number; // int
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetHistoryRequestResult = RequestResult<GetHistoryRequest, GetHistoryResponse>

export function getHistory(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetHistoryRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetHistoryRequestResult> {return requestHandler.execute(createRequest(getHistoryEndpointSchema,
payload), config);}
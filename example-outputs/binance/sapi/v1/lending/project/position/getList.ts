import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getListEndpointSchema = {
path: '/sapi/v1/lending/project/position/list', 
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

export type GetListRequest = RequestUnion<any,
any,
{
'asset': string;
'projectId'?: string;
'status'?: 'ALL' | 'SUBSCRIBABLE' | 'UNSUBSCRIBABLE';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetListResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'asset': string;
'canTransfer': boolean;
'createTimestamp': number; // int
'duration': number; // int
'endTime': number; // int
'interest': string;
'interestRate': string;
'lot': number; // int
'positionId': number; // int
'principal': string;
'projectId': string;
'projectName': string;
'purchaseTime': number; // int
'redeemDate': string; // date
'startTime': number; // int
'status': string;
'type': string;
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetListRequestResult = RequestResult<GetListRequest, GetListResponse>

export function getList(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetListRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetListRequestResult> {return requestHandler.execute(createRequest(getListEndpointSchema,
payload), config);}
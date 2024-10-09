import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getRepayEndpointSchema = {
path: '/sapi/v1/margin/borrow-repay', 
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
}
}
}

export type GetRepayRequest = RequestUnion<any,
any,
{
'asset': string;
'isolatedSymbol'?: string;
'txId'?: number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
'type': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetRepayResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'rows': (
{
'isolatedSymbol'?: string;
'amount'?: string;
'asset': string;
'interest'?: string;
'principal': string;
'status': string;
'timestamp': number; // int
'txId': number; // int
}
)[];
'total': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>>

export type GetRepayRequestResult = RequestResult<GetRepayRequest, GetRepayResponse>

export function getRepay(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetRepayRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetRepayRequestResult> {return requestHandler.execute(createRequest(getRepayEndpointSchema,
payload), config);}
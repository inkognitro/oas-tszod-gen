import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getInterestRateHistoryEndpointSchema = {
path: '/sapi/v1/margin/interestRateHistory', 
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

export type GetInterestRateHistoryRequest = RequestUnion<any,
any,
{
'asset': string;
'vipLevel'?: number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetInterestRateHistoryResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'asset': string;
'dailyInterestRate': string;
'timestamp': number; // int
'vipLevel': number; // int
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetInterestRateHistoryRequestResult = RequestResult<GetInterestRateHistoryRequest, GetInterestRateHistoryResponse>

export function getInterestRateHistory(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetInterestRateHistoryRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetInterestRateHistoryRequestResult> {return requestHandler.execute(createRequest(getInterestRateHistoryEndpointSchema,
payload), config);}
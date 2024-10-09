import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getSummaryEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/index/user-summary', 
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

export type GetSummaryRequest = RequestUnion<any,
any,
{
'indexId': number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetSummaryResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'indexId': number; // int
'totalInvestedInUSD': string;
'currentInvestedInUSD': string;
'pnlInUSD': string;
'roi': string;
'assetAllocation': (
{
'targetAsset': string;
'allocation': string;
}
)[];
'details': (
{
'targetAsset': string;
'averagePriceInUSD': string;
'totalInvestedInUSD': string;
'currentInvestedInUSD': string;
'purchasedAmount': string;
'pnlInUSD': string;
'roi': string;
'percentage': string;
'availableAmount': string;
'redeemedAmount': string;
'assetValueInUSD': string;
}
)[];
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetSummaryRequestResult = RequestResult<GetSummaryRequest, GetSummaryResponse>

export function getSummary(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetSummaryRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetSummaryRequestResult> {return requestHandler.execute(createRequest(getSummaryEndpointSchema,
payload), config);}
import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1LendingAutoInvestIndexUserSummaryEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/index/user-summary', 
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

export type GetSapiV1LendingAutoInvestIndexUserSummaryPayload = {
'queryParams': {
'indexId': number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LendingAutoInvestIndexUserSummaryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'indexId': number; // int
'totalInvestedInUSD': string;
'currentInvestedInUSD': string;
'pnlInUSD': string;
'roi': string;
'assetAllocation': ({
'targetAsset': string;
'allocation': string;
})[];
'details': ({
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
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LendingAutoInvestIndexUserSummaryRequestResult = RequestResult<Request, GetSapiV1LendingAutoInvestIndexUserSummaryResponse>

export function getSapiV1LendingAutoInvestIndexUserSummary(requestHandler: RequestHandler, payload: GetSapiV1LendingAutoInvestIndexUserSummaryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LendingAutoInvestIndexUserSummaryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LendingAutoInvestIndexUserSummaryEndpointSchema}), config);}
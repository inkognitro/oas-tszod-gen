import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {SubAccountUSDTFuturesSummary, SubAccountCOINFuturesSummary, Error} from '@example-outputs/binance';

export const getAccountSummaryEndpointSchema = {
path: '/sapi/v2/sub-account/futures/accountSummary', 
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

export type GetAccountSummaryRequest = RequestUnion<any,
any,
{
'futuresType': number; // int
'page'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetAccountSummaryResponse = ResponseUnion<200, ResponseBodyData<'application/json', SubAccountUSDTFuturesSummary
|SubAccountCOINFuturesSummary>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetAccountSummaryRequestResult = RequestResult<GetAccountSummaryRequest, GetAccountSummaryResponse>

export function getAccountSummary(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetAccountSummaryRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetAccountSummaryRequestResult> {return requestHandler.execute(createRequest(getAccountSummaryEndpointSchema,
payload), config);}
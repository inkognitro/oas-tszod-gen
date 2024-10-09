import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getDataEndpointSchema = {
path: '/sapi/v1/loan/loanable/data', 
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

export type GetDataRequest = RequestUnion<any,
any,
{
'loanCoin'?: string;
'vipLevel'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetDataResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'rows': (
{
'loanCoin': string;
'_7dHourlyInterestRate': string;
'_7dDailyInterestRate': string;
'_14dHourlyInterestRate': string;
'_14dDailyInterestRate': string;
'_30dHourlyInterestRate': string;
'_30dDailyInterestRate': string;
'_90dHourlyInterestRate': string;
'_90dDailyInterestRate': string;
'_180dHourlyInterestRate': string;
'_180dDailyInterestRate': string;
'minLimit': string;
'maxLimit': string;
'vipLevel': number; // int
}
)[];
'total': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetDataRequestResult = RequestResult<GetDataRequest, GetDataResponse>

export function getData(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetDataRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetDataRequestResult> {return requestHandler.execute(createRequest(getDataEndpointSchema,
payload), config);}
import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1LoanVipLoanableDataEndpointSchema = {
path: '/sapi/v1/loan/vip/loanable/data', 
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

export type GetSapiV1LoanVipLoanableDataPayload = {
'queryParams': {
'loanCoin'?: string;
'vipLevel'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LoanVipLoanableDataResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'total': number; // int
'rows': ({
'loanCoin': string;
'_flexibleDailyInterestRate': string;
'_flexibleYearlyInterestRate': string;
'_30dDailyInterestRate': string;
'_30dYearlyInterestRate': string;
'_60dDailyInterestRate': string;
'_60dYearlyInterestRate': string;
'minLimit': string;
'maxLimit': string;
'vipLevel': number; // int
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanVipLoanableDataRequestResult = RequestResult<Request, GetSapiV1LoanVipLoanableDataResponse>

export function getSapiV1LoanVipLoanableData(requestHandler: RequestHandler, payload: GetSapiV1LoanVipLoanableDataPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanVipLoanableDataRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanVipLoanableDataEndpointSchema}), config);}
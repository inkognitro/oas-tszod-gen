import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1LoanLoanableDataEndpointSchema = {
path: '/sapi/v1/loan/loanable/data', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'loanCoin': z.string().optional(),
'vipLevel': z.number().int().safe().finite().optional(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'rows': z.array(z.object({
'loanCoin': z.string(),
'_7dHourlyInterestRate': z.string(),
'_7dDailyInterestRate': z.string(),
'_14dHourlyInterestRate': z.string(),
'_14dDailyInterestRate': z.string(),
'_30dHourlyInterestRate': z.string(),
'_30dDailyInterestRate': z.string(),
'_90dHourlyInterestRate': z.string(),
'_90dDailyInterestRate': z.string(),
'_180dHourlyInterestRate': z.string(),
'_180dDailyInterestRate': z.string(),
'minLimit': z.string(),
'maxLimit': z.string(),
'vipLevel': z.number().int().safe().finite(),
})),
'total': z.number().int().safe().finite(),
})
}
}
},
'400': {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
},
'401': {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}
}
}

export type GetSapiV1LoanLoanableDataPayload = {
'queryParams': {
'loanCoin'?: string;
'vipLevel'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LoanLoanableDataResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
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
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanLoanableDataRequestResult = RequestResult<Request, GetSapiV1LoanLoanableDataResponse>

export function getSapiV1LoanLoanableData(requestHandler: RequestHandler, payload: GetSapiV1LoanLoanableDataPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanLoanableDataRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanLoanableDataEndpointSchema}), config);}
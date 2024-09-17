import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1LoanBorrowHistoryEndpointSchema = {
path: '/sapi/v1/loan/borrow/history', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'orderId': z.number().int().safe().finite().optional(),
'loanCoin': z.string().optional(),
'collateralCoin': z.string().optional(),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
'current': z.number().int().safe().finite().optional(),
'limit': z.number().int().safe().finite().optional(),
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
'orderId': z.number().int().safe().finite(),
'loanCoin': z.string(),
'initialLoanAmount': z.string(),
'hourlyInterestRate': z.string(),
'loanTerm': z.string(),
'collateralCoin': z.string(),
'initialCollateralAmount': z.string(),
'borrowTime': z.number().int().safe().finite(),
'status': z.string(),
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

export type GetSapiV1LoanBorrowHistoryPayload = {
'queryParams': {
'orderId'?: number; // int
'loanCoin'?: string;
'collateralCoin'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LoanBorrowHistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'orderId': number; // int
'loanCoin': string;
'initialLoanAmount': string;
'hourlyInterestRate': string;
'loanTerm': string;
'collateralCoin': string;
'initialCollateralAmount': string;
'borrowTime': number; // int
'status': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanBorrowHistoryRequestResult = RequestResult<Request, GetSapiV1LoanBorrowHistoryResponse>

export function getSapiV1LoanBorrowHistory(requestHandler: RequestHandler, payload: GetSapiV1LoanBorrowHistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanBorrowHistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanBorrowHistoryEndpointSchema}), config);}
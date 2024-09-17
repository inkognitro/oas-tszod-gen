import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1LoanVipRepayHistoryEndpointSchema = {
path: '/sapi/v1/loan/vip/repay/history', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'orderId': z.number().int().safe().finite().optional(),
'loanCoin': z.string().optional(),
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
'loanCoin': z.string(),
'repayAmount': z.string(),
'collateralCoin': z.string(),
'repayStatus': z.string(),
'repayTime': z.string(),
'orderId': z.string(),
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

export type GetSapiV1LoanVipRepayHistoryPayload = {
'queryParams': {
'orderId'?: number; // int
'loanCoin'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LoanVipRepayHistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'loanCoin': string;
'repayAmount': string;
'collateralCoin': string;
'repayStatus': string;
'repayTime': string;
'orderId': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanVipRepayHistoryRequestResult = RequestResult<Request, GetSapiV1LoanVipRepayHistoryResponse>

export function getSapiV1LoanVipRepayHistory(requestHandler: RequestHandler, payload: GetSapiV1LoanVipRepayHistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanVipRepayHistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanVipRepayHistoryEndpointSchema}), config);}
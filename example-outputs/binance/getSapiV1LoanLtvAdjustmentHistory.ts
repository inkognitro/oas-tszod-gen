import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1LoanLtvAdjustmentHistoryEndpointSchema = {
path: '/sapi/v1/loan/ltv/adjustment/history', 
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

export type GetSapiV1LoanLtvAdjustmentHistoryPayload = {
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

export type GetSapiV1LoanLtvAdjustmentHistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'loanCoin': string;
'collateralCoin': string;
'direction': string;
'amount': string;
'preLTV': string;
'afterLTV': string;
'adjustTime': number; // int
'orderId': number; // int
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanLtvAdjustmentHistoryRequestResult = RequestResult<Request, GetSapiV1LoanLtvAdjustmentHistoryResponse>

export function getSapiV1LoanLtvAdjustmentHistory(requestHandler: RequestHandler, payload: GetSapiV1LoanLtvAdjustmentHistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanLtvAdjustmentHistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanLtvAdjustmentHistoryEndpointSchema}), config);}
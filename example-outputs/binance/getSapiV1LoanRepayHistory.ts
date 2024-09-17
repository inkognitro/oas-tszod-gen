import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1LoanRepayHistoryEndpointSchema = {
path: '/sapi/v1/loan/repay/history', 
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

export type GetSapiV1LoanRepayHistoryPayload = {
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

export type GetSapiV1LoanRepayHistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'loanCoin': string;
'repayAmount': string;
'collateralCoin': string;
'collateralUsed': string;
'collateralReturn': string;
'repayType': string;
'repayStatus': string;
'repayTime': number; // int
'orderId': number; // int
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanRepayHistoryRequestResult = RequestResult<Request, GetSapiV1LoanRepayHistoryResponse>

export function getSapiV1LoanRepayHistory(requestHandler: RequestHandler, payload: GetSapiV1LoanRepayHistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanRepayHistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanRepayHistoryEndpointSchema}), config);}
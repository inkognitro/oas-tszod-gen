import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV2LoanFlexibleLtvAdjustmentHistoryEndpointSchema = {
path: '/sapi/v2/loan/flexible/ltv/adjustment/history', 
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

export type GetSapiV2LoanFlexibleLtvAdjustmentHistoryPayload = {
'queryParams': {
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

export type GetSapiV2LoanFlexibleLtvAdjustmentHistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'loanCoin': string;
'collateralCoin': string;
'direction': string;
'collateralAmount': string;
'preLTV': string;
'afterLTV': string;
'adjustTime': number; // int
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV2LoanFlexibleLtvAdjustmentHistoryRequestResult = RequestResult<Request, GetSapiV2LoanFlexibleLtvAdjustmentHistoryResponse>

export function getSapiV2LoanFlexibleLtvAdjustmentHistory(requestHandler: RequestHandler, payload: GetSapiV2LoanFlexibleLtvAdjustmentHistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV2LoanFlexibleLtvAdjustmentHistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV2LoanFlexibleLtvAdjustmentHistoryEndpointSchema}), config);}
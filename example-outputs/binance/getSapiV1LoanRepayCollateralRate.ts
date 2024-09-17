import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1LoanRepayCollateralRateEndpointSchema = {
path: '/sapi/v1/loan/repay/collateral/rate', 
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

export type GetSapiV1LoanRepayCollateralRatePayload = {
'queryParams': {
'loanCoin': string;
'collateralCoin': string;
'repayAmount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LoanRepayCollateralRateResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'loanCoin': string;
'collateralCoin': string;
'repayAmount': string;
'rate': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LoanRepayCollateralRateRequestResult = RequestResult<Request, GetSapiV1LoanRepayCollateralRateResponse>

export function getSapiV1LoanRepayCollateralRate(requestHandler: RequestHandler, payload: GetSapiV1LoanRepayCollateralRatePayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LoanRepayCollateralRateRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LoanRepayCollateralRateEndpointSchema}), config);}
import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV2LoanFlexibleRepayEndpointSchema = {
path: '/sapi/v2/loan/flexible/repay', 
method: 'post', 
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

export type PostSapiV2LoanFlexibleRepayPayload = {
'queryParams': {
'loanCoin'?: string;
'collateralCoin'?: string;
'repayAmount': number;
'collateralReturn'?: boolean;
'fullRepayment'?: boolean;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV2LoanFlexibleRepayResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'loanCoin': string;
'collateralCoin': string;
'remainingDebt': string;
'remainingCollateral': string;
'fullRepayment': boolean;
'currentLTV': string;
'repayStatus': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV2LoanFlexibleRepayRequestResult = RequestResult<Request, PostSapiV2LoanFlexibleRepayResponse>

export function postSapiV2LoanFlexibleRepay(requestHandler: RequestHandler, payload: PostSapiV2LoanFlexibleRepayPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV2LoanFlexibleRepayRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV2LoanFlexibleRepayEndpointSchema}), config);}
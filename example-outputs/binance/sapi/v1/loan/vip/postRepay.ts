import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postRepayEndpointSchema = {
path: '/sapi/v1/loan/vip/repay', 
method: 'post', 
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

export type PostRepayRequest = RequestUnion<any,
any,
{
'orderId'?: number; // int
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostRepayResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'loanCoin': string;
'repayAmount': string;
'remainingPrincipal': string;
'remainingInterest': string;
'collateralCoin': string;
'currentLTV': string;
'repayStatus': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostRepayRequestResult = RequestResult<PostRepayRequest, PostRepayResponse>

export function postRepay(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostRepayRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostRepayRequestResult> {return requestHandler.execute(createRequest(postRepayEndpointSchema,
payload), config);}
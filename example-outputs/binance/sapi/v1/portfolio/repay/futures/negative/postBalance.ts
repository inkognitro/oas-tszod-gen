import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postBalanceEndpointSchema = {
path: '/sapi/v1/portfolio/repay-futures-negative-balance', 
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

export type PostBalanceRequest = RequestUnion<any,
any,
{
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostBalanceResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'msg': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostBalanceRequestResult = RequestResult<PostBalanceRequest, PostBalanceResponse>

export function postBalance(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostBalanceRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostBalanceRequestResult> {return requestHandler.execute(createRequest(postBalanceEndpointSchema,
payload), config);}
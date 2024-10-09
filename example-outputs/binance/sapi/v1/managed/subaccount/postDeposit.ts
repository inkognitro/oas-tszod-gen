import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postDepositEndpointSchema = {
path: '/sapi/v1/managed-subaccount/deposit', 
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

export type PostDepositRequest = RequestUnion<any,
any,
{
'toEmail': string;
'asset': string;
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostDepositResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'tranId': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostDepositRequestResult = RequestResult<PostDepositRequest, PostDepositResponse>

export function postDeposit(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostDepositRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostDepositRequestResult> {return requestHandler.execute(createRequest(postDepositEndpointSchema,
payload), config);}
import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postVirtualSubAccountEndpointSchema = {
path: '/sapi/v1/sub-account/virtualSubAccount', 
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

export type PostVirtualSubAccountRequest = RequestUnion<any,
any,
{
'subAccountString': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostVirtualSubAccountResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'email': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostVirtualSubAccountRequestResult = RequestResult<PostVirtualSubAccountRequest, PostVirtualSubAccountResponse>

export function postVirtualSubAccount(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostVirtualSubAccountRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostVirtualSubAccountRequestResult> {return requestHandler.execute(createRequest(postVirtualSubAccountEndpointSchema,
payload), config);}
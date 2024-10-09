import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postSwitchEndpointSchema = {
path: '/sapi/v1/portfolio/repay-futures-switch', 
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

export type PostSwitchRequest = RequestUnion<any,
any,
{
'autoRepay': boolean;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostSwitchResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'msg': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostSwitchRequestResult = RequestResult<PostSwitchRequest, PostSwitchResponse>

export function postSwitch(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostSwitchRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostSwitchRequestResult> {return requestHandler.execute(createRequest(postSwitchEndpointSchema,
payload), config);}
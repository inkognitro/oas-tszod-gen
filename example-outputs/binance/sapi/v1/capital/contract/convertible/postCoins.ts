import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postCoinsEndpointSchema = {
path: '/sapi/v1/capital/contract/convertible-coins', 
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

export type PostCoinsRequest = RequestUnion<any,
any,
{
'coin': string;
'enable': boolean;
}>

export type PostCoinsResponse = ResponseUnion<200, ResponseBodyData<'application/json', {

}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostCoinsRequestResult = RequestResult<PostCoinsRequest, PostCoinsResponse>

export function postCoins(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostCoinsRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostCoinsRequestResult> {return requestHandler.execute(createRequest(postCoinsEndpointSchema,
payload), config);}
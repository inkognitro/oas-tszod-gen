import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postAccountEndpointSchema = {
path: '/sapi/v1/margin/isolated/account', 
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

export type PostAccountRequest = RequestUnion<any,
any,
{
'symbol': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostAccountResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'success': boolean;
'symbol': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostAccountRequestResult = RequestResult<PostAccountRequest, PostAccountResponse>

export function postAccount(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostAccountRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostAccountRequestResult> {return requestHandler.execute(createRequest(postAccountEndpointSchema,
payload), config);}
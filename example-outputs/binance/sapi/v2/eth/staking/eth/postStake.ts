import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postStakeEndpointSchema = {
path: '/sapi/v2/eth-staking/eth/stake', 
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

export type PostStakeRequest = RequestUnion<any,
any,
{
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostStakeResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'success': boolean;
'wbethAmount': string;
'conversionRatio': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostStakeRequestResult = RequestResult<PostStakeRequest, PostStakeResponse>

export function postStake(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostStakeRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostStakeRequestResult> {return requestHandler.execute(createRequest(postStakeEndpointSchema,
payload), config);}
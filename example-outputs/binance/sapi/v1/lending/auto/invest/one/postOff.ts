import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postOffEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/one-off', 
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

export type PostOffRequest = RequestUnion<any,
any,
{
'sourceType': string;
'requestId'?: string;
'subscriptionAmount': number;
'sourceAsset': string;
'flexibleAllowedToUse'?: boolean;
'planId'?: number; // int
'indexId'?: number; // int
'details'?: (
{
'targetAsset'?: string;
'percentage'?: number; // int
}
)[];
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostOffResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'transactionId': number; // int
'waitSecond': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostOffRequestResult = RequestResult<PostOffRequest, PostOffResponse>

export function postOff(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostOffRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostOffRequestResult> {return requestHandler.execute(createRequest(postOffEndpointSchema,
payload), config);}
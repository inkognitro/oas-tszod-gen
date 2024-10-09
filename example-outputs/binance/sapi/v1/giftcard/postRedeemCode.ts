import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postRedeemCodeEndpointSchema = {
path: '/sapi/v1/giftcard/redeemCode', 
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

export type PostRedeemCodeRequest = RequestUnion<any,
any,
{
'code': string;
'externalUid'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostRedeemCodeResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'code': string;
'message': string;
'data': {
'token': string;
'amount': string;
'referenceNo': string;
'identityNo': string;
};
'success': boolean;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostRedeemCodeRequestResult = RequestResult<PostRedeemCodeRequest, PostRedeemCodeResponse>

export function postRedeemCode(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostRedeemCodeRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostRedeemCodeRequestResult> {return requestHandler.execute(createRequest(postRedeemCodeEndpointSchema,
payload), config);}
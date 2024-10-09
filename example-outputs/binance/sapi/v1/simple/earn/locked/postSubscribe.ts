import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postSubscribeEndpointSchema = {
path: '/sapi/v1/simple-earn/locked/subscribe', 
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

export type PostSubscribeRequest = RequestUnion<any,
any,
{
'projectId': string;
'amount': number;
'autoSubscribe'?: boolean;
'sourceAccount'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostSubscribeResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'purchaseId': number; // int
'positionId': string;
'success': boolean;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostSubscribeRequestResult = RequestResult<PostSubscribeRequest, PostSubscribeResponse>

export function postSubscribe(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostSubscribeRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostSubscribeRequestResult> {return requestHandler.execute(createRequest(postSubscribeEndpointSchema,
payload), config);}
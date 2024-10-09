import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postStatusEndpointSchema = {
path: '/sapi/v1/dci/product/auto_compound/edit-status', 
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

export type PostStatusRequest = RequestUnion<any,
any,
{
'positionId': number; // int
'autoCompoundPlan': 'NONE' | 'STANDARD' | 'ADVANCE';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostStatusResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'positionId': string;
'autoCompoundPlan': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostStatusRequestResult = RequestResult<PostStatusRequest, PostStatusResponse>

export function postStatus(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostStatusRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostStatusRequestResult> {return requestHandler.execute(createRequest(postStatusEndpointSchema,
payload), config);}
import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postCollectionEndpointSchema = {
path: '/sapi/v1/portfolio/auto-collection', 
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

export type PostCollectionRequest = RequestUnion<any,
any,
{
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostCollectionResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'msg': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostCollectionRequestResult = RequestResult<PostCollectionRequest, PostCollectionResponse>

export function postCollection(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostCollectionRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostCollectionRequestResult> {return requestHandler.execute(createRequest(postCollectionEndpointSchema,
payload), config);}
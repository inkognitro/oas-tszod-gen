import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const deleteIsolatedEndpointSchema = {
path: '/sapi/v1/userDataStream/isolated', 
method: 'delete', 
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
}
}
}

export type DeleteIsolatedRequest = RequestUnion<any,
any,
{
'listenKey'?: string;
}>

export type DeleteIsolatedResponse = ResponseUnion<200, ResponseBodyData<'application/json', {

}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>>

export type DeleteIsolatedRequestResult = RequestResult<DeleteIsolatedRequest, DeleteIsolatedResponse>

export function deleteIsolated(requestHandler: SimpleRequestHandler, payload: RequestPayload<DeleteIsolatedRequest, never, 'queryParams'>, config?: RequestHandlerExecutionConfig): Promise<DeleteIsolatedRequestResult> {return requestHandler.execute(createRequest(deleteIsolatedEndpointSchema,
payload), config);}
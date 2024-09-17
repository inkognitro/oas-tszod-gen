import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1LendingPositionchangedEndpointSchema = {
path: '/sapi/v1/lending/positionChanged', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
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

export type PostSapiV1LendingPositionchangedPayload = {
'queryParams': {
'projectId': string;
'lot': string;
'positionId'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1LendingPositionchangedResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'dailyPurchaseId': number; // int
'success': boolean;
'time': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1LendingPositionchangedRequestResult = RequestResult<Request, PostSapiV1LendingPositionchangedResponse>

export function postSapiV1LendingPositionchanged(requestHandler: RequestHandler, payload: PostSapiV1LendingPositionchangedPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1LendingPositionchangedRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1LendingPositionchangedEndpointSchema}), config);}
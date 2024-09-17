import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1LendingAutoInvestOneOffEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/one-off', 
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

export type PostSapiV1LendingAutoInvestOneOffPayload = {
'queryParams': {
'sourceType': string;
'requestId'?: string;
'subscriptionAmount': number;
'sourceAsset': string;
'flexibleAllowedToUse'?: boolean;
'planId'?: number; // int
'indexId'?: number; // int
'details'?: ({
'targetAsset'?: string;
'percentage'?: number; // int
})[];
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1LendingAutoInvestOneOffResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'transactionId': number; // int
'waitSecond': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1LendingAutoInvestOneOffRequestResult = RequestResult<Request, PostSapiV1LendingAutoInvestOneOffResponse>

export function postSapiV1LendingAutoInvestOneOff(requestHandler: RequestHandler, payload: PostSapiV1LendingAutoInvestOneOffPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1LendingAutoInvestOneOffRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1LendingAutoInvestOneOffEndpointSchema}), config);}
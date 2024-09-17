import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1LoanCustomizeMargin_callEndpointSchema = {
path: '/sapi/v1/loan/customize/margin_call', 
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

export type PostSapiV1LoanCustomizeMargin_callPayload = {
'queryParams': {
'orderId'?: number; // int
'collateralCoin'?: string;
'marginCall': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1LoanCustomizeMargin_callResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'orderId': string;
'collateralCoin': string;
'preMarginCall': string;
'afterMarginCall': string;
'customizeTime': number; // int
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1LoanCustomizeMargin_callRequestResult = RequestResult<Request, PostSapiV1LoanCustomizeMargin_callResponse>

export function postSapiV1LoanCustomizeMargin_call(requestHandler: RequestHandler, payload: PostSapiV1LoanCustomizeMargin_callPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1LoanCustomizeMargin_callRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1LoanCustomizeMargin_callEndpointSchema}), config);}
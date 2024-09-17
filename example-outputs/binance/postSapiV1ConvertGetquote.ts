import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1ConvertGetquoteEndpointSchema = {
path: '/sapi/v1/convert/getQuote', 
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

export type PostSapiV1ConvertGetquotePayload = {
'queryParams': {
'fromAsset': string;
'toAsset': string;
'fromAmount'?: number;
'toAmount'?: number;
'validTime'?: string;
'walletType'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1ConvertGetquoteResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'quoteId': string;
'ratio': string;
'inverseRatio': string;
'validTimestamp': number; // int
'toAmount': string;
'fromAmount': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1ConvertGetquoteRequestResult = RequestResult<Request, PostSapiV1ConvertGetquoteResponse>

export function postSapiV1ConvertGetquote(requestHandler: RequestHandler, payload: PostSapiV1ConvertGetquotePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1ConvertGetquoteRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1ConvertGetquoteEndpointSchema}), config);}
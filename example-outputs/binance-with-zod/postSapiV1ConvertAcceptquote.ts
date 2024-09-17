import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1ConvertAcceptquoteEndpointSchema = {
path: '/sapi/v1/convert/acceptQuote', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'quoteId': z.string(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'orderId': z.string(),
'createTime': z.number().int().safe().finite(),
'orderStatus': z.string(),
})
}
}
},
'400': {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
},
'401': {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
}
}
}
}
}

export type PostSapiV1ConvertAcceptquotePayload = {
'queryParams': {
'quoteId': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1ConvertAcceptquoteResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'orderId': string;
'createTime': number; // int
'orderStatus': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1ConvertAcceptquoteRequestResult = RequestResult<Request, PostSapiV1ConvertAcceptquoteResponse>

export function postSapiV1ConvertAcceptquote(requestHandler: RequestHandler, payload: PostSapiV1ConvertAcceptquotePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1ConvertAcceptquoteRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1ConvertAcceptquoteEndpointSchema}), config);}
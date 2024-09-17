import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1SubAccountMarginEnableEndpointSchema = {
path: '/sapi/v1/sub-account/margin/enable', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'email': z.string(),
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
'email': z.string(),
'isMarginEnabled': z.boolean(),
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

export type PostSapiV1SubAccountMarginEnablePayload = {
'queryParams': {
'email': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SubAccountMarginEnableResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'email': string;
'isMarginEnabled': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SubAccountMarginEnableRequestResult = RequestResult<Request, PostSapiV1SubAccountMarginEnableResponse>

export function postSapiV1SubAccountMarginEnable(requestHandler: RequestHandler, payload: PostSapiV1SubAccountMarginEnablePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SubAccountMarginEnableRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SubAccountMarginEnableEndpointSchema}), config);}
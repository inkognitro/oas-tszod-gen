import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1SubAccountEoptionsEnableEndpointSchema = {
path: '/sapi/v1/sub-account/eoptions/enable', 
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
'isEOptionsEnabled': z.boolean(),
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

export type PostSapiV1SubAccountEoptionsEnablePayload = {
'queryParams': {
'email': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SubAccountEoptionsEnableResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'email': string;
'isEOptionsEnabled': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SubAccountEoptionsEnableRequestResult = RequestResult<Request, PostSapiV1SubAccountEoptionsEnableResponse>

export function postSapiV1SubAccountEoptionsEnable(requestHandler: RequestHandler, payload: PostSapiV1SubAccountEoptionsEnablePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SubAccountEoptionsEnableRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SubAccountEoptionsEnableEndpointSchema}), config);}
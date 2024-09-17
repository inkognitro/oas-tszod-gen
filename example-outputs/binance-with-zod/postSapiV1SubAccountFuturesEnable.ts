import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1SubAccountFuturesEnableEndpointSchema = {
path: '/sapi/v1/sub-account/futures/enable', 
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
'isFuturesEnabled': z.boolean(),
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

export type PostSapiV1SubAccountFuturesEnablePayload = {
'queryParams': {
'email': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SubAccountFuturesEnableResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'email': string;
'isFuturesEnabled': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SubAccountFuturesEnableRequestResult = RequestResult<Request, PostSapiV1SubAccountFuturesEnableResponse>

export function postSapiV1SubAccountFuturesEnable(requestHandler: RequestHandler, payload: PostSapiV1SubAccountFuturesEnablePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SubAccountFuturesEnableRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SubAccountFuturesEnableEndpointSchema}), config);}
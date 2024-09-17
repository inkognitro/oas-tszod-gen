import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1BlvtSubscribeEndpointSchema = {
path: '/sapi/v1/blvt/subscribe', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'tokenName': z.string(),
'cost': z.number().safe().finite(),
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
'id': z.number().int().safe().finite(),
'status': z.string(),
'tokenName': z.string(),
'amount': z.string(),
'cost': z.string(),
'timestamp': z.number().int().safe().finite(),
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

export type PostSapiV1BlvtSubscribePayload = {
'queryParams': {
'tokenName': string;
'cost': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1BlvtSubscribeResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'id': number; // int
'status': string;
'tokenName': string;
'amount': string;
'cost': string;
'timestamp': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1BlvtSubscribeRequestResult = RequestResult<Request, PostSapiV1BlvtSubscribeResponse>

export function postSapiV1BlvtSubscribe(requestHandler: RequestHandler, payload: PostSapiV1BlvtSubscribePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1BlvtSubscribeRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1BlvtSubscribeEndpointSchema}), config);}
import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1SimpleEarnLockedSubscribeEndpointSchema = {
path: '/sapi/v1/simple-earn/locked/subscribe', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'projectId': z.string(),
'amount': z.number().safe().finite(),
'autoSubscribe': z.boolean().optional(),
'sourceAccount': z.string().optional(),
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
'purchaseId': z.number().int().safe().finite(),
'positionId': z.string(),
'success': z.boolean(),
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

export type PostSapiV1SimpleEarnLockedSubscribePayload = {
'queryParams': {
'projectId': string;
'amount': number;
'autoSubscribe'?: boolean;
'sourceAccount'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SimpleEarnLockedSubscribeResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'purchaseId': number; // int
'positionId': string;
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SimpleEarnLockedSubscribeRequestResult = RequestResult<Request, PostSapiV1SimpleEarnLockedSubscribeResponse>

export function postSapiV1SimpleEarnLockedSubscribe(requestHandler: RequestHandler, payload: PostSapiV1SimpleEarnLockedSubscribePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SimpleEarnLockedSubscribeRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SimpleEarnLockedSubscribeEndpointSchema}), config);}
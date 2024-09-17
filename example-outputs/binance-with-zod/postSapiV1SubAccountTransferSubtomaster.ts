import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1SubAccountTransferSubtomasterEndpointSchema = {
path: '/sapi/v1/sub-account/transfer/subToMaster', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'asset': z.string(),
'amount': z.number().safe().finite(),
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
'txnId': z.string(),
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

export type PostSapiV1SubAccountTransferSubtomasterPayload = {
'queryParams': {
'asset': string;
'amount': number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1SubAccountTransferSubtomasterResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'txnId': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1SubAccountTransferSubtomasterRequestResult = RequestResult<Request, PostSapiV1SubAccountTransferSubtomasterResponse>

export function postSapiV1SubAccountTransferSubtomaster(requestHandler: RequestHandler, payload: PostSapiV1SubAccountTransferSubtomasterPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1SubAccountTransferSubtomasterRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1SubAccountTransferSubtomasterEndpointSchema}), config);}
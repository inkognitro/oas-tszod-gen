import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1FuturesTransferEndpointSchema = {
path: '/sapi/v1/futures/transfer', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'asset': z.string(),
'amount': z.number().safe().finite(),
'type': z.number().int().safe().finite(),
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
'tranId': z.number().int().safe().finite(),
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

export type PostSapiV1FuturesTransferPayload = {
'queryParams': {
'asset': string;
'amount': number;
'type': number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1FuturesTransferResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'tranId': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1FuturesTransferRequestResult = RequestResult<Request, PostSapiV1FuturesTransferResponse>

export function postSapiV1FuturesTransfer(requestHandler: RequestHandler, payload: PostSapiV1FuturesTransferPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1FuturesTransferRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1FuturesTransferEndpointSchema}), config);}
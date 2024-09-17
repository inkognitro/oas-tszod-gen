import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1ConvertLimitCancelorderEndpointSchema = {
path: '/sapi/v1/convert/limit/cancelOrder', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'orderId': z.number().int().safe().finite(),
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
'orderId': z.number().int().safe().finite(),
'status': z.string(),
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

export type PostSapiV1ConvertLimitCancelorderPayload = {
'queryParams': {
'orderId': number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1ConvertLimitCancelorderResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'orderId': number; // int
'status': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1ConvertLimitCancelorderRequestResult = RequestResult<Request, PostSapiV1ConvertLimitCancelorderResponse>

export function postSapiV1ConvertLimitCancelorder(requestHandler: RequestHandler, payload: PostSapiV1ConvertLimitCancelorderPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1ConvertLimitCancelorderRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1ConvertLimitCancelorderEndpointSchema}), config);}
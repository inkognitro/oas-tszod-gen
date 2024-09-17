import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postSapiV1MarginMaxLeverageEndpointSchema = {
path: '/sapi/v1/margin/max-leverage', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'maxLeverage': z.number().int().safe().finite(),
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

export type PostSapiV1MarginMaxLeveragePayload = {
'queryParams': {
'maxLeverage': number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1MarginMaxLeverageResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1MarginMaxLeverageRequestResult = RequestResult<Request, PostSapiV1MarginMaxLeverageResponse>

export function postSapiV1MarginMaxLeverage(requestHandler: RequestHandler, payload: PostSapiV1MarginMaxLeveragePayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1MarginMaxLeverageRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1MarginMaxLeverageEndpointSchema}), config);}
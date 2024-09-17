import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1MarginIsolatedAccountlimitEndpointSchema = {
path: '/sapi/v1/margin/isolated/accountLimit', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
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
'enabledAccount': z.number().int().safe().finite(),
'maxAccount': z.number().int().safe().finite(),
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

export type GetSapiV1MarginIsolatedAccountlimitPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginIsolatedAccountlimitResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'enabledAccount': number; // int
'maxAccount': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginIsolatedAccountlimitRequestResult = RequestResult<Request, GetSapiV1MarginIsolatedAccountlimitResponse>

export function getSapiV1MarginIsolatedAccountlimit(requestHandler: RequestHandler, payload: GetSapiV1MarginIsolatedAccountlimitPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginIsolatedAccountlimitRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginIsolatedAccountlimitEndpointSchema}), config);}
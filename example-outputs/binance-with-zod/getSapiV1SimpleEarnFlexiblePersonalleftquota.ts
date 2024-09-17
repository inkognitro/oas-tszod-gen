import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnFlexiblePersonalleftquotaEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/personalLeftQuota', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'productId': z.string(),
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
'leftPersonalQuota': z.string(),
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

export type GetSapiV1SimpleEarnFlexiblePersonalleftquotaPayload = {
'queryParams': {
'productId': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SimpleEarnFlexiblePersonalleftquotaResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'leftPersonalQuota': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnFlexiblePersonalleftquotaRequestResult = RequestResult<Request, GetSapiV1SimpleEarnFlexiblePersonalleftquotaResponse>

export function getSapiV1SimpleEarnFlexiblePersonalleftquota(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnFlexiblePersonalleftquotaPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnFlexiblePersonalleftquotaRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnFlexiblePersonalleftquotaEndpointSchema}), config);}
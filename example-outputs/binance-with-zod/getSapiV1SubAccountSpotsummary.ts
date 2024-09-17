import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SubAccountSpotsummaryEndpointSchema = {
path: '/sapi/v1/sub-account/spotSummary', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'email': z.string().optional(),
'page': z.number().int().safe().finite().optional(),
'size': z.number().int().safe().finite().optional(),
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
'totalCount': z.number().int().safe().finite(),
'masterAccountTotalAsset': z.string(),
'spotSubUserAssetBtcVoList': z.array(z.object({
'email': z.string(),
'totalAsset': z.string(),
})),
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

export type GetSapiV1SubAccountSpotsummaryPayload = {
'queryParams': {
'email'?: string;
'page'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SubAccountSpotsummaryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'totalCount': number; // int
'masterAccountTotalAsset': string;
'spotSubUserAssetBtcVoList': ({
'email': string;
'totalAsset': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SubAccountSpotsummaryRequestResult = RequestResult<Request, GetSapiV1SubAccountSpotsummaryResponse>

export function getSapiV1SubAccountSpotsummary(requestHandler: RequestHandler, payload: GetSapiV1SubAccountSpotsummaryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SubAccountSpotsummaryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SubAccountSpotsummaryEndpointSchema}), config);}
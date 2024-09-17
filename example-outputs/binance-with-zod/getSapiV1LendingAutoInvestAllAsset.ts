import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1LendingAutoInvestAllAssetEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/all/asset', 
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
'targetAssets': z.array(z.string()),
'sourceAssets': z.array(z.string()),
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

export type GetSapiV1LendingAutoInvestAllAssetPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LendingAutoInvestAllAssetResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'targetAssets': (string)[];
'sourceAssets': (string)[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LendingAutoInvestAllAssetRequestResult = RequestResult<Request, GetSapiV1LendingAutoInvestAllAssetResponse>

export function getSapiV1LendingAutoInvestAllAsset(requestHandler: RequestHandler, payload: GetSapiV1LendingAutoInvestAllAssetPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LendingAutoInvestAllAssetRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LendingAutoInvestAllAssetEndpointSchema}), config);}
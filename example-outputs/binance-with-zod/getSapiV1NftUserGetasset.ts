import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1NftUserGetassetEndpointSchema = {
path: '/sapi/v1/nft/user/getAsset', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'limit': z.number().int().safe().finite().optional(),
'page': z.number().int().safe().finite().optional(),
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
'total': z.number().int().safe().finite(),
'list': z.array(z.object({
'network': z.string(),
'contractAddress': z.string(),
'tokenId': z.string(),
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

export type GetSapiV1NftUserGetassetPayload = {
'queryParams': {
'limit'?: number; // int
'page'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1NftUserGetassetResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'total': number; // int
'list': ({
'network': string;
'contractAddress': string;
'tokenId': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1NftUserGetassetRequestResult = RequestResult<Request, GetSapiV1NftUserGetassetResponse>

export function getSapiV1NftUserGetasset(requestHandler: RequestHandler, payload: GetSapiV1NftUserGetassetPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1NftUserGetassetRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1NftUserGetassetEndpointSchema}), config);}
import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1MarginIsolatedAllpairsEndpointSchema = {
path: '/sapi/v1/margin/isolated/allPairs', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.array(z.object({
'symbol': z.string(),
'base': z.string(),
'quote': z.string(),
'isMarginTrade': z.boolean(),
'isBuyAllowed': z.boolean(),
'isSellAllowed': z.boolean(),
}))
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

export type GetSapiV1MarginIsolatedAllpairsPayload = {
'queryParams': {
'symbol': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginIsolatedAllpairsResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'symbol': string;
'base': string;
'quote': string;
'isMarginTrade': boolean;
'isBuyAllowed': boolean;
'isSellAllowed': boolean;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginIsolatedAllpairsRequestResult = RequestResult<Request, GetSapiV1MarginIsolatedAllpairsResponse>

export function getSapiV1MarginIsolatedAllpairs(requestHandler: RequestHandler, payload: GetSapiV1MarginIsolatedAllpairsPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginIsolatedAllpairsRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginIsolatedAllpairsEndpointSchema}), config);}
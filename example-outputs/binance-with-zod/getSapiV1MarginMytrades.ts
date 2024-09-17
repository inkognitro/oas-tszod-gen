import {marginTradeZodSchema, errorZodSchema, MarginTrade, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1MarginMytradesEndpointSchema = {
path: '/sapi/v1/margin/myTrades', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
'isIsolated': z.union([z.literal('TRUE'),z.literal('FALSE')]).optional(),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
'fromId': z.number().int().safe().finite().optional(),
'limit': z.number().int().safe().finite().optional(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.array(marginTradeZodSchema)
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

export type GetSapiV1MarginMytradesPayload = {
'queryParams': {
'symbol': string;
'isIsolated'?: 'TRUE' | 'FALSE';
'startTime'?: number; // int
'endTime'?: number; // int
'fromId'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginMytradesResponse = Response<200, ResponseData<ResponseBodyData<'application/json', (MarginTrade)[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginMytradesRequestResult = RequestResult<Request, GetSapiV1MarginMytradesResponse>

export function getSapiV1MarginMytrades(requestHandler: RequestHandler, payload: GetSapiV1MarginMytradesPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginMytradesRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginMytradesEndpointSchema}), config);}
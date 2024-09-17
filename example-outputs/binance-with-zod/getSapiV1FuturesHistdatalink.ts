import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1FuturesHistdatalinkEndpointSchema = {
path: '/sapi/v1/futures/histDataLink', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
'dataType': z.union([z.literal('T_DEPTH'),z.literal('S_DEPTH')]),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
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
'data': z.array(z.object({
'day': z.string(),
'url': z.string(),
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

export type GetSapiV1FuturesHistdatalinkPayload = {
'queryParams': {
'symbol': string;
'dataType': 'T_DEPTH' | 'S_DEPTH';
'startTime'?: number; // int
'endTime'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1FuturesHistdatalinkResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'data': ({
'day': string;
'url': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1FuturesHistdatalinkRequestResult = RequestResult<Request, GetSapiV1FuturesHistdatalinkResponse>

export function getSapiV1FuturesHistdatalink(requestHandler: RequestHandler, payload: GetSapiV1FuturesHistdatalinkPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1FuturesHistdatalinkRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1FuturesHistdatalinkEndpointSchema}), config);}
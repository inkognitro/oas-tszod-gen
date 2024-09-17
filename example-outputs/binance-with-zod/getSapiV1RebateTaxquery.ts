import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1RebateTaxqueryEndpointSchema = {
path: '/sapi/v1/rebate/taxQuery', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
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
'status': z.string(),
'type': z.string(),
'code': z.string(),
'data': z.object({
'page': z.number().int().safe().finite(),
'totalRecords': z.number().int().safe().finite(),
'totalPageNum': z.number().int().safe().finite(),
'data': z.array(z.object({
'asset': z.string(),
'type': z.number().int().safe().finite(),
'amount': z.string(),
'updateTime': z.number().int().safe().finite(),
})),
}),
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

export type GetSapiV1RebateTaxqueryPayload = {
'queryParams': {
'startTime'?: number; // int
'endTime'?: number; // int
'page'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1RebateTaxqueryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'status': string;
'type': string;
'code': string;
'data': {
'page': number; // int
'totalRecords': number; // int
'totalPageNum': number; // int
'data': ({
'asset': string;
'type': number; // int
'amount': string;
'updateTime': number; // int
})[];
};
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1RebateTaxqueryRequestResult = RequestResult<Request, GetSapiV1RebateTaxqueryResponse>

export function getSapiV1RebateTaxquery(requestHandler: RequestHandler, payload: GetSapiV1RebateTaxqueryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1RebateTaxqueryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1RebateTaxqueryEndpointSchema}), config);}
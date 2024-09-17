import {snapshotSpotZodSchema, snapshotMarginZodSchema, snapshotFuturesZodSchema, errorZodSchema, SnapshotSpot, SnapshotMargin, SnapshotFutures, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1AccountsnapshotEndpointSchema = {
path: '/sapi/v1/accountSnapshot', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'type': z.union([z.literal('SPOT'),z.literal('MARGIN'),z.literal('FUTURES')]),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
'limit': z.number().int().safe().finite().gte(7).lte(30).optional(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.union([snapshotSpotZodSchema,snapshotMarginZodSchema,snapshotFuturesZodSchema])
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

export type GetSapiV1AccountsnapshotPayload = {
'queryParams': {
'type': 'SPOT' | 'MARGIN' | 'FUTURES';
'startTime'?: number; // int
'endTime'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1AccountsnapshotResponse = Response<200, ResponseData<ResponseBodyData<'application/json', SnapshotSpot
|SnapshotMargin
|SnapshotFutures>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1AccountsnapshotRequestResult = RequestResult<Request, GetSapiV1AccountsnapshotResponse>

export function getSapiV1Accountsnapshot(requestHandler: RequestHandler, payload: GetSapiV1AccountsnapshotPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1AccountsnapshotRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1AccountsnapshotEndpointSchema}), config);}
import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1AssetCustodyTransferHistoryEndpointSchema = {
path: '/sapi/v1/asset/custody/transfer-history', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'email': z.string(),
'startTime': z.number().int().safe().finite(),
'endTime': z.number().int().safe().finite(),
'type': z.string().optional(),
'asset': z.string(),
'current': z.number().int().safe().finite().optional(),
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
'total': z.number().int().safe().finite(),
'rows': z.array(z.object({
'clientTranId': z.string(),
'transferType': z.string(),
'asset': z.string(),
'amount': z.string(),
'time': z.number().int().safe().finite(),
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

export type GetSapiV1AssetCustodyTransferHistoryPayload = {
'queryParams': {
'email': string;
'startTime': number; // int
'endTime': number; // int
'type'?: string;
'asset': string;
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1AssetCustodyTransferHistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'total': number; // int
'rows': ({
'clientTranId': string;
'transferType': string;
'asset': string;
'amount': string;
'time': number; // int
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1AssetCustodyTransferHistoryRequestResult = RequestResult<Request, GetSapiV1AssetCustodyTransferHistoryResponse>

export function getSapiV1AssetCustodyTransferHistory(requestHandler: RequestHandler, payload: GetSapiV1AssetCustodyTransferHistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1AssetCustodyTransferHistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1AssetCustodyTransferHistoryEndpointSchema}), config);}
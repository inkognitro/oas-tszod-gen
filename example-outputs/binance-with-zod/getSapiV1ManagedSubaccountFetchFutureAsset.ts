import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1ManagedSubaccountFetchFutureAssetEndpointSchema = {
path: '/sapi/v1/managed-subaccount/fetch-future-asset', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'email': z.string(),
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
'code': z.number().int().safe().finite(),
'message': z.string(),
'snapshotVos': z.array(z.object({
'type': z.string(),
'updateTime': z.number().int().safe().finite(),
'data': z.object({
'assets': z.array(z.object({
'asset': z.string(),
'marginBalance': z.number().safe().finite(),
'walletBalance': z.number().safe().finite(),
})),
'position': z.array(z.object({
'symbol': z.string(),
'entryPrice': z.number().safe().finite(),
'markPrice': z.number().safe().finite(),
'positionAmt': z.number().safe().finite(),
})),
}),
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

export type GetSapiV1ManagedSubaccountFetchFutureAssetPayload = {
'queryParams': {
'email': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1ManagedSubaccountFetchFutureAssetResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': number; // int
'message': string;
'snapshotVos': ({
'type': string;
'updateTime': number; // int
'data': {
'assets': ({
'asset': string;
'marginBalance': number;
'walletBalance': number;
})[];
'position': ({
'symbol': string;
'entryPrice': number;
'markPrice': number;
'positionAmt': number;
})[];
};
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1ManagedSubaccountFetchFutureAssetRequestResult = RequestResult<Request, GetSapiV1ManagedSubaccountFetchFutureAssetResponse>

export function getSapiV1ManagedSubaccountFetchFutureAsset(requestHandler: RequestHandler, payload: GetSapiV1ManagedSubaccountFetchFutureAssetPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1ManagedSubaccountFetchFutureAssetRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1ManagedSubaccountFetchFutureAssetEndpointSchema}), config);}
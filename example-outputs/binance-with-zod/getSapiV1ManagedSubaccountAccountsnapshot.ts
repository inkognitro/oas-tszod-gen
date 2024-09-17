import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1ManagedSubaccountAccountsnapshotEndpointSchema = {
path: '/sapi/v1/managed-subaccount/accountSnapshot', 
method: 'get', 
supportedSecuritySchemas: [], 
queryParamsZodSchema: z.object({
'email': z.string(),
'type': z.string(),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
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
zodSchema: z.object({
'code': z.number().int().safe().finite(),
'msg': z.string(),
'snapshotVos': z.array(z.object({
'data': z.object({
'balances': z.array(z.object({
'asset': z.string(),
'free': z.string(),
'locked': z.string(),
})),
'totalAssetOfBtc': z.string(),
}),
'type': z.string(),
'updateTime': z.number().int().safe().finite(),
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

export type GetSapiV1ManagedSubaccountAccountsnapshotPayload = {
'queryParams': {
'email': string;
'type': string;
'startTime'?: number; // int
'endTime'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1ManagedSubaccountAccountsnapshotResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': number; // int
'msg': string;
'snapshotVos': ({
'data': {
'balances': ({
'asset': string;
'free': string;
'locked': string;
})[];
'totalAssetOfBtc': string;
};
'type': string;
'updateTime': number; // int
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1ManagedSubaccountAccountsnapshotRequestResult = RequestResult<Request, GetSapiV1ManagedSubaccountAccountsnapshotResponse>

export function getSapiV1ManagedSubaccountAccountsnapshot(requestHandler: RequestHandler, payload: GetSapiV1ManagedSubaccountAccountsnapshotPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1ManagedSubaccountAccountsnapshotRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1ManagedSubaccountAccountsnapshotEndpointSchema}), config);}
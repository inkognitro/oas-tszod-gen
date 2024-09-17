import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1AssetLedgerTransferCloudMiningQuerybypageEndpointSchema = {
path: '/sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'tranId': z.number().int().safe().finite().optional(),
'clientTranId': z.string().optional(),
'asset': z.string().optional(),
'startTime': z.number().int().safe().finite(),
'endTime': z.number().int().safe().finite(),
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
'createTime': z.number().int().safe().finite(),
'tranId': z.number().int().safe().finite(),
'type': z.number().int().safe().finite(),
'asset': z.string(),
'amount': z.string(),
'status': z.string(),
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

export type GetSapiV1AssetLedgerTransferCloudMiningQuerybypagePayload = {
'queryParams': {
'tranId'?: number; // int
'clientTranId'?: string;
'asset'?: string;
'startTime': number; // int
'endTime': number; // int
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1AssetLedgerTransferCloudMiningQuerybypageResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'total': number; // int
'rows': ({
'createTime': number; // int
'tranId': number; // int
'type': number; // int
'asset': string;
'amount': string;
'status': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1AssetLedgerTransferCloudMiningQuerybypageRequestResult = RequestResult<Request, GetSapiV1AssetLedgerTransferCloudMiningQuerybypageResponse>

export function getSapiV1AssetLedgerTransferCloudMiningQuerybypage(requestHandler: RequestHandler, payload: GetSapiV1AssetLedgerTransferCloudMiningQuerybypagePayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1AssetLedgerTransferCloudMiningQuerybypageRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1AssetLedgerTransferCloudMiningQuerybypageEndpointSchema}), config);}
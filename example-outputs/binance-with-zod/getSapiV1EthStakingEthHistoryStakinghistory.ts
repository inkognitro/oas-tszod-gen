import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1EthStakingEthHistoryStakinghistoryEndpointSchema = {
path: '/sapi/v1/eth-staking/eth/history/stakingHistory', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
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
'rows': z.array(z.object({
'time': z.number().int().safe().finite(),
'asset': z.string(),
'amount': z.string(),
'status': z.string(),
'distributeAmount': z.string(),
'conversionRatio': z.string(),
})),
'total': z.number().int().safe().finite(),
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

export type GetSapiV1EthStakingEthHistoryStakinghistoryPayload = {
'queryParams': {
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1EthStakingEthHistoryStakinghistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'time': number; // int
'asset': string;
'amount': string;
'status': string;
'distributeAmount': string;
'conversionRatio': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1EthStakingEthHistoryStakinghistoryRequestResult = RequestResult<Request, GetSapiV1EthStakingEthHistoryStakinghistoryResponse>

export function getSapiV1EthStakingEthHistoryStakinghistory(requestHandler: RequestHandler, payload: GetSapiV1EthStakingEthHistoryStakinghistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1EthStakingEthHistoryStakinghistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1EthStakingEthHistoryStakinghistoryEndpointSchema}), config);}
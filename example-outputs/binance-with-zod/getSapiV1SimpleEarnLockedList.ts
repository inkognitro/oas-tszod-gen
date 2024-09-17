import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnLockedListEndpointSchema = {
path: '/sapi/v1/simple-earn/locked/list', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'asset': z.string().optional(),
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
'projectId': z.string(),
'detail': z.object({
'asset': z.string(),
'rewardAsset': z.string(),
'duration': z.number().int().safe().finite(),
'renewable': z.boolean(),
'isSoldOut': z.boolean(),
'apr': z.string(),
'status': z.string(),
'subscriptionStartTime': z.string(),
'extraRewardAsset': z.string(),
'extraRewardAPR': z.string(),
}),
'quota': z.object({
'totalPersonalQuota': z.string(),
'minimum': z.string(),
}),
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

export type GetSapiV1SimpleEarnLockedListPayload = {
'queryParams': {
'asset'?: string;
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SimpleEarnLockedListResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'projectId': string;
'detail': {
'asset': string;
'rewardAsset': string;
'duration': number; // int
'renewable': boolean;
'isSoldOut': boolean;
'apr': string;
'status': string;
'subscriptionStartTime': string;
'extraRewardAsset': string;
'extraRewardAPR': string;
};
'quota': {
'totalPersonalQuota': string;
'minimum': string;
};
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnLockedListRequestResult = RequestResult<Request, GetSapiV1SimpleEarnLockedListResponse>

export function getSapiV1SimpleEarnLockedList(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnLockedListPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnLockedListRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnLockedListEndpointSchema}), config);}
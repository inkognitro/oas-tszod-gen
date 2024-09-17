import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnFlexibleHistoryRewardsrecordEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/history/rewardsRecord', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'productId': z.string().optional(),
'asset': z.string().optional(),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
'type': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.object({
'rows': z.array(z.object({
'asset': z.string(),
'rewards': z.string(),
'projectId': z.string(),
'type': z.string(),
'time': z.number().int().safe().finite(),
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

export type GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordPayload = {
'queryParams': {
'productId'?: string;
'asset'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'type': string;
};
}

export type GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'asset': string;
'rewards': string;
'projectId': string;
'type': string;
'time': number; // int
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordRequestResult = RequestResult<Request, GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordResponse>

export function getSapiV1SimpleEarnFlexibleHistoryRewardsrecord(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnFlexibleHistoryRewardsrecordRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnFlexibleHistoryRewardsrecordEndpointSchema}), config);}
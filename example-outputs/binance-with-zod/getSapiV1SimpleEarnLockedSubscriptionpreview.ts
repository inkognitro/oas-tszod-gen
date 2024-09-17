import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnLockedSubscriptionpreviewEndpointSchema = {
path: '/sapi/v1/simple-earn/locked/subscriptionPreview', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'projectId': z.string(),
'amount': z.number().safe().finite(),
'autoSubscribe': z.boolean().optional(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.array(z.object({
'rewardAsset': z.string(),
'totalRewardAmt': z.string(),
'extraRewardAsset': z.string(),
'estTotalExtraRewardAmt': z.string(),
'nextPay': z.string(),
'nextPayDate': z.string(),
'valueDate': z.string(),
'rewardsEndDate': z.string(),
'deliverDate': z.string(),
'nextSubscriptionDate': z.string(),
}))
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

export type GetSapiV1SimpleEarnLockedSubscriptionpreviewPayload = {
'queryParams': {
'projectId': string;
'amount': number;
'autoSubscribe'?: boolean;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SimpleEarnLockedSubscriptionpreviewResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'rewardAsset': string;
'totalRewardAmt': string;
'extraRewardAsset': string;
'estTotalExtraRewardAmt': string;
'nextPay': string;
'nextPayDate': string;
'valueDate': string;
'rewardsEndDate': string;
'deliverDate': string;
'nextSubscriptionDate': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnLockedSubscriptionpreviewRequestResult = RequestResult<Request, GetSapiV1SimpleEarnLockedSubscriptionpreviewResponse>

export function getSapiV1SimpleEarnLockedSubscriptionpreview(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnLockedSubscriptionpreviewPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnLockedSubscriptionpreviewRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnLockedSubscriptionpreviewEndpointSchema}), config);}
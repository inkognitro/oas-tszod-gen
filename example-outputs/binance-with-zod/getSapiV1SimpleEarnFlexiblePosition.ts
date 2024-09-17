import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SimpleEarnFlexiblePositionEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/position', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'asset': z.string().optional(),
'productId': z.string().optional(),
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
'totalAmount': z.string(),
'tierAnnualPercentageRate': z.object({
'0-5BTC': z.number().safe().finite(),
'5-10BTC': z.number().safe().finite(),
}),
'latestAnnualPercentageRate': z.string(),
'yesterdayAirdropPercentageRate': z.string(),
'asset': z.string(),
'airDropAsset': z.string(),
'canRedeem': z.boolean(),
'collateralAmount': z.string(),
'productId': z.string(),
'yesterdayRealTimeRewards': z.string(),
'cumulativeBonusRewards': z.string(),
'cumulativeRealTimeRewards': z.string(),
'cumulativeTotalRewards': z.string(),
'autoSubscribe': z.boolean(),
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

export type GetSapiV1SimpleEarnFlexiblePositionPayload = {
'queryParams': {
'asset'?: string;
'productId'?: string;
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SimpleEarnFlexiblePositionResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'totalAmount': string;
'tierAnnualPercentageRate': {
'0-5BTC': number;
'5-10BTC': number;
};
'latestAnnualPercentageRate': string;
'yesterdayAirdropPercentageRate': string;
'asset': string;
'airDropAsset': string;
'canRedeem': boolean;
'collateralAmount': string;
'productId': string;
'yesterdayRealTimeRewards': string;
'cumulativeBonusRewards': string;
'cumulativeRealTimeRewards': string;
'cumulativeTotalRewards': string;
'autoSubscribe': boolean;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnFlexiblePositionRequestResult = RequestResult<Request, GetSapiV1SimpleEarnFlexiblePositionResponse>

export function getSapiV1SimpleEarnFlexiblePosition(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnFlexiblePositionPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnFlexiblePositionRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnFlexiblePositionEndpointSchema}), config);}
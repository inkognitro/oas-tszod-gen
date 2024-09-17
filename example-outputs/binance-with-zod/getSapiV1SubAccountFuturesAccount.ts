import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SubAccountFuturesAccountEndpointSchema = {
path: '/sapi/v1/sub-account/futures/account', 
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
'email': z.string(),
'asset': z.string(),
'assets': z.array(z.object({
'asset': z.string(),
'initialMargin': z.string(),
'maintenanceMargin': z.string(),
'marginBalance': z.string(),
'maxWithdrawAmount': z.string(),
'openOrderInitialMargin': z.string(),
'positionInitialMargin': z.string(),
'unrealizedProfit': z.string(),
'walletBalance': z.string(),
})),
'canDeposit': z.boolean(),
'canTrade': z.boolean(),
'canWithdraw': z.boolean(),
'feeTier': z.number().int().safe().finite(),
'maxWithdrawAmount': z.string(),
'totalInitialMargin': z.string(),
'totalMaintenanceMargin': z.string(),
'totalMarginBalance': z.string(),
'totalOpenOrderInitialMargin': z.string(),
'totalPositionInitialMargin': z.string(),
'totalUnrealizedProfit': z.string(),
'totalWalletBalance': z.string(),
'updateTime': z.number().int().safe().finite(),
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

export type GetSapiV1SubAccountFuturesAccountPayload = {
'queryParams': {
'email': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SubAccountFuturesAccountResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'email': string;
'asset': string;
'assets': ({
'asset': string;
'initialMargin': string;
'maintenanceMargin': string;
'marginBalance': string;
'maxWithdrawAmount': string;
'openOrderInitialMargin': string;
'positionInitialMargin': string;
'unrealizedProfit': string;
'walletBalance': string;
})[];
'canDeposit': boolean;
'canTrade': boolean;
'canWithdraw': boolean;
'feeTier': number; // int
'maxWithdrawAmount': string;
'totalInitialMargin': string;
'totalMaintenanceMargin': string;
'totalMarginBalance': string;
'totalOpenOrderInitialMargin': string;
'totalPositionInitialMargin': string;
'totalUnrealizedProfit': string;
'totalWalletBalance': string;
'updateTime': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SubAccountFuturesAccountRequestResult = RequestResult<Request, GetSapiV1SubAccountFuturesAccountResponse>

export function getSapiV1SubAccountFuturesAccount(requestHandler: RequestHandler, payload: GetSapiV1SubAccountFuturesAccountPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SubAccountFuturesAccountRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SubAccountFuturesAccountEndpointSchema}), config);}
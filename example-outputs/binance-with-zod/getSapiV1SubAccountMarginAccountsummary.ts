import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SubAccountMarginAccountsummaryEndpointSchema = {
path: '/sapi/v1/sub-account/margin/accountSummary', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
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
'totalAssetOfBtc': z.string(),
'totalLiabilityOfBtc': z.string(),
'totalNetAssetOfBtc': z.string(),
'subAccountList': z.array(z.object({
'email': z.string(),
'totalAssetOfBtc': z.string(),
'totalLiabilityOfBtc': z.string(),
'totalNetAssetOfBtc': z.string(),
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

export type GetSapiV1SubAccountMarginAccountsummaryPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SubAccountMarginAccountsummaryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'totalAssetOfBtc': string;
'totalLiabilityOfBtc': string;
'totalNetAssetOfBtc': string;
'subAccountList': ({
'email': string;
'totalAssetOfBtc': string;
'totalLiabilityOfBtc': string;
'totalNetAssetOfBtc': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SubAccountMarginAccountsummaryRequestResult = RequestResult<Request, GetSapiV1SubAccountMarginAccountsummaryResponse>

export function getSapiV1SubAccountMarginAccountsummary(requestHandler: RequestHandler, payload: GetSapiV1SubAccountMarginAccountsummaryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SubAccountMarginAccountsummaryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SubAccountMarginAccountsummaryEndpointSchema}), config);}
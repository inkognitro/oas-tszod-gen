import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1MarginCrossmargindataEndpointSchema = {
path: '/sapi/v1/margin/crossMarginData', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'vipLevel': z.number().int().safe().finite().optional(),
'coin': z.string().optional(),
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
'vipLevel': z.number().int().safe().finite(),
'coin': z.string(),
'transferIn': z.boolean(),
'borrowable': z.boolean(),
'dailyInterest': z.string(),
'yearlyInterest': z.string(),
'borrowLimit': z.string(),
'marginablePairs': z.array(z.string()),
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

export type GetSapiV1MarginCrossmargindataPayload = {
'queryParams': {
'vipLevel'?: number; // int
'coin'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginCrossmargindataResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'vipLevel': number; // int
'coin': string;
'transferIn': boolean;
'borrowable': boolean;
'dailyInterest': string;
'yearlyInterest': string;
'borrowLimit': string;
'marginablePairs': (string)[];
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginCrossmargindataRequestResult = RequestResult<Request, GetSapiV1MarginCrossmargindataResponse>

export function getSapiV1MarginCrossmargindata(requestHandler: RequestHandler, payload: GetSapiV1MarginCrossmargindataPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginCrossmargindataRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginCrossmargindataEndpointSchema}), config);}
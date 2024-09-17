import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1PortfolioAccountEndpointSchema = {
path: '/sapi/v1/portfolio/account', 
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
'uniMMR': z.string(),
'accountEquity': z.string(),
'actualEquity': z.string(),
'accountMaintMargin': z.string(),
'accountStatus': z.string(),
'accountType': z.string(),
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

export type GetSapiV1PortfolioAccountPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1PortfolioAccountResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'uniMMR': string;
'accountEquity': string;
'actualEquity': string;
'accountMaintMargin': string;
'accountStatus': string;
'accountType': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1PortfolioAccountRequestResult = RequestResult<Request, GetSapiV1PortfolioAccountResponse>

export function getSapiV1PortfolioAccount(requestHandler: RequestHandler, payload: GetSapiV1PortfolioAccountPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1PortfolioAccountRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1PortfolioAccountEndpointSchema}), config);}
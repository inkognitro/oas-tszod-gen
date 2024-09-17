import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1PortfolioPmloanEndpointSchema = {
path: '/sapi/v1/portfolio/pmLoan', 
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
'asset': z.string(),
'amount': z.string(),
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

export type GetSapiV1PortfolioPmloanPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1PortfolioPmloanResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'asset': string;
'amount': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1PortfolioPmloanRequestResult = RequestResult<Request, GetSapiV1PortfolioPmloanResponse>

export function getSapiV1PortfolioPmloan(requestHandler: RequestHandler, payload: GetSapiV1PortfolioPmloanPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1PortfolioPmloanRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1PortfolioPmloanEndpointSchema}), config);}
import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1LendingAutoInvestOneOffStatusEndpointSchema = {
path: '/sapi/v1/lending/auto-invest/one-off/status', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'transactionId': z.number().int().safe().finite(),
'requestId': z.string().optional(),
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
'transactionId': z.number().int().safe().finite(),
'status': z.string(),
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

export type GetSapiV1LendingAutoInvestOneOffStatusPayload = {
'queryParams': {
'transactionId': number; // int
'requestId'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1LendingAutoInvestOneOffStatusResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'transactionId': number; // int
'status': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1LendingAutoInvestOneOffStatusRequestResult = RequestResult<Request, GetSapiV1LendingAutoInvestOneOffStatusResponse>

export function getSapiV1LendingAutoInvestOneOffStatus(requestHandler: RequestHandler, payload: GetSapiV1LendingAutoInvestOneOffStatusPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1LendingAutoInvestOneOffStatusRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1LendingAutoInvestOneOffStatusEndpointSchema}), config);}
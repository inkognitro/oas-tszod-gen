import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1CapitalDepositHisrecEndpointSchema = {
path: '/sapi/v1/capital/deposit/hisrec', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'coin': z.string().optional(),
'status': z.number().int().safe().finite().optional(),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
'offset': z.number().int().safe().finite().optional(),
'limit': z.number().int().safe().finite().optional(),
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
'amount': z.string(),
'coin': z.string(),
'network': z.string(),
'status': z.number().int().safe().finite(),
'address': z.string(),
'addressTag': z.string(),
'txId': z.string(),
'insertTime': z.number().int().safe().finite(),
'transferType': z.number().int().safe().finite(),
'unlockConfirm': z.string(),
'confirmTimes': z.string(),
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

export type GetSapiV1CapitalDepositHisrecPayload = {
'queryParams': {
'coin'?: string;
'status'?: number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'offset'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1CapitalDepositHisrecResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'amount': string;
'coin': string;
'network': string;
'status': number; // int
'address': string;
'addressTag': string;
'txId': string;
'insertTime': number; // int
'transferType': number; // int
'unlockConfirm': string;
'confirmTimes': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1CapitalDepositHisrecRequestResult = RequestResult<Request, GetSapiV1CapitalDepositHisrecResponse>

export function getSapiV1CapitalDepositHisrec(requestHandler: RequestHandler, payload: GetSapiV1CapitalDepositHisrecPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1CapitalDepositHisrecRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1CapitalDepositHisrecEndpointSchema}), config);}
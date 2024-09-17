import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1SubAccountFuturesInternaltransferEndpointSchema = {
path: '/sapi/v1/sub-account/futures/internalTransfer', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'email': z.string(),
'futuresType': z.number().int().safe().finite(),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
'page': z.number().int().safe().finite().optional(),
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
zodSchema: z.object({
'success': z.boolean(),
'futuresType': z.number().int().safe().finite(),
'transfers': z.array(z.object({
'from': z.string(),
'to': z.string(),
'asset': z.string(),
'qty': z.string(),
'tranId': z.number().int().safe().finite(),
'time': z.number().int().safe().finite(),
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

export type GetSapiV1SubAccountFuturesInternaltransferPayload = {
'queryParams': {
'email': string;
'futuresType': number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'page'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SubAccountFuturesInternaltransferResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'success': boolean;
'futuresType': number; // int
'transfers': ({
'from': string;
'to': string;
'asset': string;
'qty': string;
'tranId': number; // int
'time': number; // int
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SubAccountFuturesInternaltransferRequestResult = RequestResult<Request, GetSapiV1SubAccountFuturesInternaltransferResponse>

export function getSapiV1SubAccountFuturesInternaltransfer(requestHandler: RequestHandler, payload: GetSapiV1SubAccountFuturesInternaltransferPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SubAccountFuturesInternaltransferRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SubAccountFuturesInternaltransferEndpointSchema}), config);}
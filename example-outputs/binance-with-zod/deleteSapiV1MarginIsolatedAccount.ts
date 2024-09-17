import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const deleteSapiV1MarginIsolatedAccountEndpointSchema = {
path: '/sapi/v1/margin/isolated/account', 
method: 'delete', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
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
'symbol': z.string(),
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

export type DeleteSapiV1MarginIsolatedAccountPayload = {
'queryParams': {
'symbol': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type DeleteSapiV1MarginIsolatedAccountResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'success': boolean;
'symbol': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type DeleteSapiV1MarginIsolatedAccountRequestResult = RequestResult<Request, DeleteSapiV1MarginIsolatedAccountResponse>

export function deleteSapiV1MarginIsolatedAccount(requestHandler: RequestHandler, payload: DeleteSapiV1MarginIsolatedAccountPayload, config?: RequestHandlerExecutionConfig): Promise<DeleteSapiV1MarginIsolatedAccountRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: deleteSapiV1MarginIsolatedAccountEndpointSchema}), config);}
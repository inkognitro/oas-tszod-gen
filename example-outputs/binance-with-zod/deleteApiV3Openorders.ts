import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const deleteApiV3OpenordersEndpointSchema = {
path: '/api/v3/openOrders', 
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
zodSchema: z.array(z.any())
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

export type DeleteApiV3OpenordersPayload = {
'queryParams': {
'symbol': string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type DeleteApiV3OpenordersResponse = Response<200, ResponseData<ResponseBodyData<'application/json', (any)[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type DeleteApiV3OpenordersRequestResult = RequestResult<Request, DeleteApiV3OpenordersResponse>

export function deleteApiV3Openorders(requestHandler: RequestHandler, payload: DeleteApiV3OpenordersPayload, config?: RequestHandlerExecutionConfig): Promise<DeleteApiV3OpenordersRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: deleteApiV3OpenordersEndpointSchema}), config);}
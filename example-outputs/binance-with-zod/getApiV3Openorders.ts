import {orderDetailsZodSchema, errorZodSchema, OrderDetails, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getApiV3OpenordersEndpointSchema = {
path: '/api/v3/openOrders', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string().optional(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.array(orderDetailsZodSchema)
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

export type GetApiV3OpenordersPayload = {
'queryParams': {
'symbol'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetApiV3OpenordersResponse = Response<200, ResponseData<ResponseBodyData<'application/json', (OrderDetails)[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetApiV3OpenordersRequestResult = RequestResult<Request, GetApiV3OpenordersResponse>

export function getApiV3Openorders(requestHandler: RequestHandler, payload: GetApiV3OpenordersPayload, config?: RequestHandlerExecutionConfig): Promise<GetApiV3OpenordersRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getApiV3OpenordersEndpointSchema}), config);}
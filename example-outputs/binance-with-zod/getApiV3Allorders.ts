import {orderDetailsZodSchema, errorZodSchema, OrderDetails, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getApiV3AllordersEndpointSchema = {
path: '/api/v3/allOrders', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
'orderId': z.number().int().safe().finite().optional(),
'startTime': z.number().int().safe().finite().optional(),
'endTime': z.number().int().safe().finite().optional(),
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

export type GetApiV3AllordersPayload = {
'queryParams': {
'symbol': string;
'orderId'?: number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetApiV3AllordersResponse = Response<200, ResponseData<ResponseBodyData<'application/json', (OrderDetails)[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetApiV3AllordersRequestResult = RequestResult<Request, GetApiV3AllordersResponse>

export function getApiV3Allorders(requestHandler: RequestHandler, payload: GetApiV3AllordersPayload, config?: RequestHandlerExecutionConfig): Promise<GetApiV3AllordersRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getApiV3AllordersEndpointSchema}), config);}
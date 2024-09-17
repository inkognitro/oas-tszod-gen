import {orderDetailsZodSchema, errorZodSchema, OrderDetails, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getApiV3OrderEndpointSchema = {
path: '/api/v3/order', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
'orderId': z.number().int().safe().finite().optional(),
'origClientOrderId': z.string().optional(),
'recvWindow': z.number().int().safe().finite().optional(),
'timestamp': z.number().int().safe().finite(),
'signature': z.string(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: orderDetailsZodSchema
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

export type GetApiV3OrderPayload = {
'queryParams': {
'symbol': string;
'orderId'?: number; // int
'origClientOrderId'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetApiV3OrderResponse = Response<200, ResponseData<ResponseBodyData<'application/json', OrderDetails>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetApiV3OrderRequestResult = RequestResult<Request, GetApiV3OrderResponse>

export function getApiV3Order(requestHandler: RequestHandler, payload: GetApiV3OrderPayload, config?: RequestHandlerExecutionConfig): Promise<GetApiV3OrderRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getApiV3OrderEndpointSchema}), config);}
import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getApiV3OpenorderlistEndpointSchema = {
path: '/api/v3/openOrderList', 
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
zodSchema: z.array(z.object({
'orderListId': z.number().int().safe().finite(),
'contingencyType': z.string(),
'listStatusType': z.string(),
'listOrderStatus': z.string(),
'listClientOrderId': z.string(),
'transactionTime': z.number().int().safe().finite(),
'symbol': z.string(),
'orders': z.array(z.object({
'symbol': z.string(),
'orderId': z.number().int().safe().finite(),
'clientOrderId': z.string(),
})),
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

export type GetApiV3OpenorderlistPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetApiV3OpenorderlistResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'orderListId': number; // int
'contingencyType': string;
'listStatusType': string;
'listOrderStatus': string;
'listClientOrderId': string;
'transactionTime': number; // int
'symbol': string;
'orders': ({
'symbol': string;
'orderId': number; // int
'clientOrderId': string;
})[];
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetApiV3OpenorderlistRequestResult = RequestResult<Request, GetApiV3OpenorderlistResponse>

export function getApiV3Openorderlist(requestHandler: RequestHandler, payload: GetApiV3OpenorderlistPayload, config?: RequestHandlerExecutionConfig): Promise<GetApiV3OpenorderlistRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getApiV3OpenorderlistEndpointSchema}), config);}
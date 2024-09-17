import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1AlgoFuturesSubordersEndpointSchema = {
path: '/sapi/v1/algo/futures/subOrders', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'algoId': z.number().int().safe().finite(),
'page': z.number().int().safe().finite().optional(),
'pageSize': z.string().optional(),
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
'total': z.number().int().safe().finite(),
'executedQty': z.string(),
'executedAmt': z.string(),
'subOrders': z.array(z.object({
'algoId': z.number().int().safe().finite(),
'orderId': z.number().int().safe().finite(),
'orderStatus': z.string(),
'executedQty': z.string().optional(),
'executedAmt': z.string(),
'feeAmt': z.string(),
'feeAsset': z.string(),
'bookTime': z.number().int().safe().finite(),
'avgPrice': z.string(),
'side': z.string(),
'symbol': z.string(),
'subId': z.number().int().safe().finite(),
'timeInForce': z.string(),
'origQty': z.string(),
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

export type GetSapiV1AlgoFuturesSubordersPayload = {
'queryParams': {
'algoId': number; // int
'page'?: number; // int
'pageSize'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1AlgoFuturesSubordersResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'total': number; // int
'executedQty': string;
'executedAmt': string;
'subOrders': ({
'algoId': number; // int
'orderId': number; // int
'orderStatus': string;
'executedQty'?: string;
'executedAmt': string;
'feeAmt': string;
'feeAsset': string;
'bookTime': number; // int
'avgPrice': string;
'side': string;
'symbol': string;
'subId': number; // int
'timeInForce': string;
'origQty': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1AlgoFuturesSubordersRequestResult = RequestResult<Request, GetSapiV1AlgoFuturesSubordersResponse>

export function getSapiV1AlgoFuturesSuborders(requestHandler: RequestHandler, payload: GetSapiV1AlgoFuturesSubordersPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1AlgoFuturesSubordersRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1AlgoFuturesSubordersEndpointSchema}), config);}
import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postApiV3OrderCancelreplaceEndpointSchema = {
path: '/api/v3/order/cancelReplace', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
'side': z.union([z.literal('SELL'),z.literal('BUY')]),
'type': z.union([z.literal('LIMIT'),z.literal('MARKET'),z.literal('STOP_LOSS'),z.literal('STOP_LOSS_LIMIT'),z.literal('TAKE_PROFIT'),z.literal('TAKE_PROFIT_LIMIT'),z.literal('LIMIT_MAKER')]),
'cancelReplaceMode': z.string(),
'cancelRestrictions': z.union([z.literal('ONLY_NEW'),z.literal('ONLY_PARTIALLY_FILLED')]).optional(),
'timeInForce': z.union([z.literal('GTC'),z.literal('IOC'),z.literal('FOK')]).optional(),
'quantity': z.number().safe().finite().optional(),
'quoteOrderQty': z.number().safe().finite().optional(),
'price': z.number().safe().finite().optional(),
'cancelNewClientOrderId': z.string().optional(),
'cancelOrigClientOrderId': z.string().optional(),
'cancelOrderId': z.number().int().safe().finite().optional(),
'newClientOrderId': z.string().optional(),
'strategyId': z.number().int().safe().finite().optional(),
'strategyType': z.number().int().safe().finite().optional(),
'stopPrice': z.number().safe().finite().optional(),
'trailingDelta': z.number().safe().finite().optional(),
'icebergQty': z.number().safe().finite().optional(),
'newOrderRespType': z.union([z.literal('ACK'),z.literal('RESULT'),z.literal('FULL')]).optional(),
'selfTradePreventionMode': z.union([z.literal('EXPIRE_TAKER'),z.literal('EXPIRE_MAKER'),z.literal('EXPIRE_BOTH'),z.literal('NONE')]).optional(),
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
'cancelResult': z.string(),
'newOrderResult': z.string(),
'cancelResponse': z.object({
'symbol': z.string(),
'origClientOrderId': z.string(),
'orderId': z.number().int().safe().finite(),
'orderListId': z.number().int().safe().finite(),
'clientOrderId': z.string(),
'price': z.string(),
'origQty': z.string(),
'executedQty': z.string(),
'cummulativeQuoteQty': z.string(),
'status': z.string(),
'timeInForce': z.string(),
'type': z.string(),
'side': z.string(),
'selfTradePreventionMode': z.string(),
'transactTime': z.number().int().safe().finite().optional(),
}),
'newOrderResponse': z.object({
'symbol': z.string(),
'orderId': z.number().int().safe().finite(),
'orderListId': z.number().int().safe().finite(),
'clientOrderId': z.string(),
'transactTime': z.number().int().safe().finite(),
'price': z.string(),
'origQty': z.string(),
'executedQty': z.string(),
'cummulativeQuoteQty': z.string(),
'status': z.string(),
'timeInForce': z.string(),
'type': z.string(),
'side': z.string(),
'workingTime': z.number().int().safe().finite(),
'fills': z.array(z.string()),
'selfTradePreventionMode': z.string(),
}),
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

export type PostApiV3OrderCancelreplacePayload = {
'queryParams': {
'symbol': string;
'side': 'SELL' | 'BUY';
'type': 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT' | 'LIMIT_MAKER';
'cancelReplaceMode': string;
'cancelRestrictions'?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
'timeInForce'?: 'GTC' | 'IOC' | 'FOK';
'quantity'?: number;
'quoteOrderQty'?: number;
'price'?: number;
'cancelNewClientOrderId'?: string;
'cancelOrigClientOrderId'?: string;
'cancelOrderId'?: number; // int
'newClientOrderId'?: string;
'strategyId'?: number; // int
'strategyType'?: number; // int
'stopPrice'?: number;
'trailingDelta'?: number;
'icebergQty'?: number;
'newOrderRespType'?: 'ACK' | 'RESULT' | 'FULL';
'selfTradePreventionMode'?: 'EXPIRE_TAKER' | 'EXPIRE_MAKER' | 'EXPIRE_BOTH' | 'NONE';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostApiV3OrderCancelreplaceResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'cancelResult': string;
'newOrderResult': string;
'cancelResponse': {
'symbol': string;
'origClientOrderId': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'selfTradePreventionMode': string;
'transactTime'?: number; // int
};
'newOrderResponse': {
'symbol': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'transactTime': number; // int
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'workingTime': number; // int
'fills': (string)[];
'selfTradePreventionMode': string;
};
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostApiV3OrderCancelreplaceRequestResult = RequestResult<Request, PostApiV3OrderCancelreplaceResponse>

export function postApiV3OrderCancelreplace(requestHandler: RequestHandler, payload: PostApiV3OrderCancelreplacePayload, config?: RequestHandlerExecutionConfig): Promise<PostApiV3OrderCancelreplaceRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postApiV3OrderCancelreplaceEndpointSchema}), config);}
import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const postApiV3SorOrderTestEndpointSchema = {
path: '/api/v3/sor/order/test', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'symbol': z.string(),
'side': z.union([z.literal('SELL'),z.literal('BUY')]),
'type': z.union([z.literal('LIMIT'),z.literal('MARKET'),z.literal('STOP_LOSS'),z.literal('STOP_LOSS_LIMIT'),z.literal('TAKE_PROFIT'),z.literal('TAKE_PROFIT_LIMIT'),z.literal('LIMIT_MAKER')]),
'timeInForce': z.union([z.literal('GTC'),z.literal('IOC'),z.literal('FOK')]).optional(),
'quantity': z.number().safe().finite(),
'price': z.number().safe().finite().optional(),
'newClientOrderId': z.string().optional(),
'strategyId': z.number().int().safe().finite().optional(),
'strategyType': z.number().int().safe().finite().optional(),
'icebergQty': z.number().safe().finite().optional(),
'newOrderRespType': z.union([z.literal('ACK'),z.literal('RESULT'),z.literal('FULL')]).optional(),
'selfTradePreventionMode': z.union([z.literal('EXPIRE_TAKER'),z.literal('EXPIRE_MAKER'),z.literal('EXPIRE_BOTH'),z.literal('NONE')]).optional(),
'computeCommissionRates': z.boolean().optional(),
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

export type PostApiV3SorOrderTestPayload = {
'queryParams': {
'symbol': string;
'side': 'SELL' | 'BUY';
'type': 'LIMIT' | 'MARKET' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT' | 'LIMIT_MAKER';
'timeInForce'?: 'GTC' | 'IOC' | 'FOK';
'quantity': number;
'price'?: number;
'newClientOrderId'?: string;
'strategyId'?: number; // int
'strategyType'?: number; // int
'icebergQty'?: number;
'newOrderRespType'?: 'ACK' | 'RESULT' | 'FULL';
'selfTradePreventionMode'?: 'EXPIRE_TAKER' | 'EXPIRE_MAKER' | 'EXPIRE_BOTH' | 'NONE';
'computeCommissionRates'?: boolean;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostApiV3SorOrderTestResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {

}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostApiV3SorOrderTestRequestResult = RequestResult<Request, PostApiV3SorOrderTestResponse>

export function postApiV3SorOrderTest(requestHandler: RequestHandler, payload: PostApiV3SorOrderTestPayload, config?: RequestHandlerExecutionConfig): Promise<PostApiV3SorOrderTestRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postApiV3SorOrderTestEndpointSchema}), config);}
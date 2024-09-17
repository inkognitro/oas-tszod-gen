import {errorZodSchema, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getSapiV1C2cOrdermatchListuserorderhistoryEndpointSchema = {
path: '/sapi/v1/c2c/orderMatch/listUserOrderHistory', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
queryParamsZodSchema: z.object({
'tradeType': z.union([z.literal('BUY'),z.literal('SELL')]),
'startTimestamp': z.number().int().safe().finite().optional(),
'endTimestamp': z.number().int().safe().finite().optional(),
'page': z.number().int().safe().finite().optional(),
'rows': z.number().int().safe().finite().optional(),
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
'code': z.string(),
'message': z.string(),
'data': z.array(z.object({
'orderNumber': z.string(),
'advNo': z.string(),
'tradeType': z.string(),
'asset': z.string(),
'fiat': z.string(),
'fiatSymbol': z.string(),
'amount': z.string(),
'totalPrice': z.string(),
'unitPrice': z.string(),
'orderStatus': z.string(),
'createTime': z.number().int().safe().finite(),
'commission': z.string(),
'counterPartNickName': z.string(),
'advertisementRole': z.string(),
})),
'total': z.number().int().safe().finite(),
'success': z.boolean(),
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

export type GetSapiV1C2cOrdermatchListuserorderhistoryPayload = {
'queryParams': {
'tradeType': 'BUY' | 'SELL';
'startTimestamp'?: number; // int
'endTimestamp'?: number; // int
'page'?: number; // int
'rows'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1C2cOrdermatchListuserorderhistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': string;
'message': string;
'data': ({
'orderNumber': string;
'advNo': string;
'tradeType': string;
'asset': string;
'fiat': string;
'fiatSymbol': string;
'amount': string;
'totalPrice': string;
'unitPrice': string;
'orderStatus': string;
'createTime': number; // int
'commission': string;
'counterPartNickName': string;
'advertisementRole': string;
})[];
'total': number; // int
'success': boolean;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1C2cOrdermatchListuserorderhistoryRequestResult = RequestResult<Request, GetSapiV1C2cOrdermatchListuserorderhistoryResponse>

export function getSapiV1C2cOrdermatchListuserorderhistory(requestHandler: RequestHandler, payload: GetSapiV1C2cOrdermatchListuserorderhistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1C2cOrdermatchListuserorderhistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1C2cOrdermatchListuserorderhistoryEndpointSchema}), config);}
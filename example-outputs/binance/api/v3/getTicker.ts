import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getTickerEndpointSchema = {
path: '/api/v3/ticker', 
method: 'get', 
supportedSecuritySchemas: [], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {

}
}
},
'400': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type GetTickerRequest = RequestUnion<any,
any,
{
'symbol'?: string;
'symbols'?: string;
'windowSize'?: string;
'type'?: string;
}>

export type GetTickerResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'symbol': string;
'priceChange': string;
'priceChangePercent': string;
'weightedAvgPrice': string;
'openPrice': string;
'highPrice': string;
'lowPrice': string;
'lastPrice': string;
'volume': string;
'quoteVolume': string;
'openTime': number; // int
'closeTime': number; // int
'firstId': number; // int
'lastId': number; // int
'count': number; // int
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>>

export type GetTickerRequestResult = RequestResult<GetTickerRequest, GetTickerResponse>

export function getTicker(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetTickerRequest, never, 'queryParams'>, config?: RequestHandlerExecutionConfig): Promise<GetTickerRequestResult> {return requestHandler.execute(createRequest(getTickerEndpointSchema,
payload), config);}
import {DayTicker, DayTickerList, Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getApiV3TickerTradingdayEndpointSchema = {
path: '/api/v3/ticker/tradingDay', 
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

export type GetApiV3TickerTradingdayPayload = {
'queryParams': {
'symbol'?: string;
'symbols'?: string;
'timeZone'?: string;
'type'?: 'FULL' | 'MINI';
};
}

export type GetApiV3TickerTradingdayResponse = Response<200, ResponseData<ResponseBodyData<'application/json', DayTicker
|DayTickerList>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetApiV3TickerTradingdayRequestResult = RequestResult<Request, GetApiV3TickerTradingdayResponse>

export function getApiV3TickerTradingday(requestHandler: RequestHandler, payload: GetApiV3TickerTradingdayPayload, config?: RequestHandlerExecutionConfig): Promise<GetApiV3TickerTradingdayRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getApiV3TickerTradingdayEndpointSchema}), config);}
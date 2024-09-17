import {dayTickerZodSchema, dayTickerListZodSchema, errorZodSchema, DayTicker, DayTickerList, Error} from '@/test-outputs/binance-with-zod';
import {z} from 'zod';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance-with-zod/core';

export const getApiV3TickerTradingdayEndpointSchema = {
path: '/api/v3/ticker/tradingDay', 
method: 'get', 
supportedSecuritySchemas: [], 
queryParamsZodSchema: z.object({
'symbol': z.string().optional(),
'symbols': z.string().optional(),
'timeZone': z.string().optional(),
'type': z.union([z.literal('FULL'),z.literal('MINI')]).optional(),
}), 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {
zodSchema: z.union([dayTickerZodSchema,dayTickerListZodSchema])
}
}
},
'400': {
bodyByContentType: {
'application/json': {
zodSchema: errorZodSchema
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
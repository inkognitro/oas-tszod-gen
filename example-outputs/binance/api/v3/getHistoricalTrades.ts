import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Trade} from '@example-outputs/binance';

export const getHistoricalTradesEndpointSchema = {
path: '/api/v3/historicalTrades', 
method: 'get', 
supportedSecuritySchemas: [], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type GetHistoricalTradesRequest = RequestUnion<any,
any,
{
'symbol': string;
'limit'?: number; // int
'fromId'?: number; // int
}>

export type GetHistoricalTradesResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
Trade
)[]>>

export type GetHistoricalTradesRequestResult = RequestResult<GetHistoricalTradesRequest, GetHistoricalTradesResponse>

export function getHistoricalTrades(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetHistoricalTradesRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetHistoricalTradesRequestResult> {return requestHandler.execute(createRequest(getHistoricalTradesEndpointSchema,
payload), config);}
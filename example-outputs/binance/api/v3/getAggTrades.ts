import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {AggTrade, Error} from '@example-outputs/binance';

export const getAggTradesEndpointSchema = {
path: '/api/v3/aggTrades', 
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

export type GetAggTradesRequest = RequestUnion<any,
any,
{
'symbol': string;
'fromId'?: number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'limit'?: number; // int
}>

export type GetAggTradesResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
AggTrade
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>>

export type GetAggTradesRequestResult = RequestResult<GetAggTradesRequest, GetAggTradesResponse>

export function getAggTrades(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetAggTradesRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetAggTradesRequestResult> {return requestHandler.execute(createRequest(getAggTradesEndpointSchema,
payload), config);}
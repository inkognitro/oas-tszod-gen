import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getKlinesEndpointSchema = {
path: '/api/v3/klines', 
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

export type GetKlinesRequest = RequestUnion<any,
any,
{
'symbol': string;
'interval': '1s' | '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';
'startTime'?: number; // int
'endTime'?: number; // int
'timeZone'?: string;
'limit'?: number; // int
}>

export type GetKlinesResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
(
number // int
|string
)[]
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>>

export type GetKlinesRequestResult = RequestResult<GetKlinesRequest, GetKlinesResponse>

export function getKlines(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetKlinesRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetKlinesRequestResult> {return requestHandler.execute(createRequest(getKlinesEndpointSchema,
payload), config);}
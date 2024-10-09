import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {BookTicker, BookTickerList, Error} from '@example-outputs/binance';

export const getBookTickerEndpointSchema = {
path: '/api/v3/ticker/bookTicker', 
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

export type GetBookTickerRequest = RequestUnion<any,
any,
{
'symbol'?: string;
'symbols'?: string;
}>

export type GetBookTickerResponse = ResponseUnion<200, ResponseBodyData<'application/json', BookTicker
|BookTickerList>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>>

export type GetBookTickerRequestResult = RequestResult<GetBookTickerRequest, GetBookTickerResponse>

export function getBookTicker(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetBookTickerRequest, never, 'queryParams'>, config?: RequestHandlerExecutionConfig): Promise<GetBookTickerRequestResult> {return requestHandler.execute(createRequest(getBookTickerEndpointSchema,
payload), config);}
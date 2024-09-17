import {BookTicker, BookTickerList, Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getApiV3TickerBooktickerEndpointSchema = {
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

export type GetApiV3TickerBooktickerPayload = {
'queryParams': {
'symbol'?: string;
'symbols'?: string;
};
}

export type GetApiV3TickerBooktickerResponse = Response<200, ResponseData<ResponseBodyData<'application/json', BookTicker
|BookTickerList>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetApiV3TickerBooktickerRequestResult = RequestResult<Request, GetApiV3TickerBooktickerResponse>

export function getApiV3TickerBookticker(requestHandler: RequestHandler, payload: GetApiV3TickerBooktickerPayload, config?: RequestHandlerExecutionConfig): Promise<GetApiV3TickerBooktickerRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getApiV3TickerBooktickerEndpointSchema}), config);}
import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getPriceIndexEndpointSchema = {
path: '/sapi/v1/margin/priceIndex', 
method: 'get', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', scopes: []}], 
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

export type GetPriceIndexRequest = RequestUnion<any,
any,
{
'symbol': string;
}>

export type GetPriceIndexResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'calcTime': number; // int
'price': string;
'symbol': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>>

export type GetPriceIndexRequestResult = RequestResult<GetPriceIndexRequest, GetPriceIndexResponse>

export function getPriceIndex(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetPriceIndexRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetPriceIndexRequestResult> {return requestHandler.execute(createRequest(getPriceIndexEndpointSchema,
payload), config);}
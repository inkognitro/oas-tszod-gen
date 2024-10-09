import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {MarginOrderDetail, Error} from '@example-outputs/binance';

export const getOpenOrdersEndpointSchema = {
path: '/sapi/v1/margin/openOrders', 
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
},
'401': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type GetOpenOrdersRequest = RequestUnion<any,
any,
{
'symbol'?: string;
'isIsolated'?: 'TRUE' | 'FALSE';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetOpenOrdersResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
MarginOrderDetail
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetOpenOrdersRequestResult = RequestResult<GetOpenOrdersRequest, GetOpenOrdersResponse>

export function getOpenOrders(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetOpenOrdersRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetOpenOrdersRequestResult> {return requestHandler.execute(createRequest(getOpenOrdersEndpointSchema,
payload), config);}
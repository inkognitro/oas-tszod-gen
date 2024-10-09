import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {OrderDetails, Error} from '@example-outputs/binance';

export const getOpenOrdersEndpointSchema = {
path: '/api/v3/openOrders', 
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
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetOpenOrdersResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
OrderDetails
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetOpenOrdersRequestResult = RequestResult<GetOpenOrdersRequest, GetOpenOrdersResponse>

export function getOpenOrders(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetOpenOrdersRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetOpenOrdersRequestResult> {return requestHandler.execute(createRequest(getOpenOrdersEndpointSchema,
payload), config);}
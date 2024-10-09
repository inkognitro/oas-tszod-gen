import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getOrderEndpointSchema = {
path: '/sapi/v1/margin/rateLimit/order', 
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

export type GetOrderRequest = RequestUnion<any,
any,
{
'isIsolated'?: string;
'symbol'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetOrderResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'rateLimitType': string;
'interval': string;
'intervalNum': number; // int
'limit': number; // int
'count': number; // int
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetOrderRequestResult = RequestResult<GetOrderRequest, GetOrderResponse>

export function getOrder(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetOrderRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetOrderRequestResult> {return requestHandler.execute(createRequest(getOrderEndpointSchema,
payload), config);}
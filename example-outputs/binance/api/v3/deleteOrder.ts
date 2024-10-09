import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Order, Error} from '@example-outputs/binance';

export const deleteOrderEndpointSchema = {
path: '/api/v3/order', 
method: 'delete', 
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

export type DeleteOrderRequest = RequestUnion<any,
any,
{
'symbol': string;
'orderId'?: number; // int
'origClientOrderId'?: string;
'newClientOrderId'?: string;
'cancelRestrictions'?: 'ONLY_NEW' | 'ONLY_PARTIALLY_FILLED';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type DeleteOrderResponse = ResponseUnion<200, ResponseBodyData<'application/json', Order>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type DeleteOrderRequestResult = RequestResult<DeleteOrderRequest, DeleteOrderResponse>

export function deleteOrder(requestHandler: SimpleRequestHandler, payload: RequestPayload<DeleteOrderRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<DeleteOrderRequestResult> {return requestHandler.execute(createRequest(deleteOrderEndpointSchema,
payload), config);}
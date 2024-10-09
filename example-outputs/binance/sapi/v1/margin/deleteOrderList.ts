import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {MarginOcoOrder, Error} from '@example-outputs/binance';

export const deleteOrderListEndpointSchema = {
path: '/sapi/v1/margin/orderList', 
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

export type DeleteOrderListRequest = RequestUnion<any,
any,
{
'symbol': string;
'isIsolated'?: 'TRUE' | 'FALSE';
'orderListId'?: number; // int
'listClientOrderId'?: string;
'newClientOrderId'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type DeleteOrderListResponse = ResponseUnion<200, ResponseBodyData<'application/json', MarginOcoOrder>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type DeleteOrderListRequestResult = RequestResult<DeleteOrderListRequest, DeleteOrderListResponse>

export function deleteOrderList(requestHandler: SimpleRequestHandler, payload: RequestPayload<DeleteOrderListRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<DeleteOrderListRequestResult> {return requestHandler.execute(createRequest(deleteOrderListEndpointSchema,
payload), config);}
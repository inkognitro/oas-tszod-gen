import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getOrderListEndpointSchema = {
path: '/api/v3/orderList', 
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

export type GetOrderListRequest = RequestUnion<any,
any,
{
'orderListId'?: number; // int
'origClientOrderId'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetOrderListResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'orderListId': number; // int
'contingencyType': string;
'listStatusType': string;
'listOrderStatus': string;
'listClientOrderId': string;
'transactionTime': number; // int
'symbol': string;
'orders': (
{
'symbol': string;
'orderId': number; // int
'clientOrderId': string;
}
)[];
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetOrderListRequestResult = RequestResult<GetOrderListRequest, GetOrderListResponse>

export function getOrderList(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetOrderListRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetOrderListRequestResult> {return requestHandler.execute(createRequest(getOrderListEndpointSchema,
payload), config);}
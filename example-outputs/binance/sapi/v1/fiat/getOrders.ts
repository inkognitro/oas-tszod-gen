import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getOrdersEndpointSchema = {
path: '/sapi/v1/fiat/orders', 
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

export type GetOrdersRequest = RequestUnion<any,
any,
{
'transactionType': number; // int
'beginTime'?: number; // int
'endTime'?: number; // int
'page'?: number; // int
'rows'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetOrdersResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'code': string;
'message': string;
'data': (
{
'orderNo': string;
'fiatCurrency': string;
'indicatedAmount': string;
'amount': string;
'totalFee': string;
'method': string;
'status': string;
'createTime': number; // int
'updateTime': number; // int
}
)[];
'total': number; // int
'success': boolean;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetOrdersRequestResult = RequestResult<GetOrdersRequest, GetOrdersResponse>

export function getOrders(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetOrdersRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetOrdersRequestResult> {return requestHandler.execute(createRequest(getOrdersEndpointSchema,
payload), config);}
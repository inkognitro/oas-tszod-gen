import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getHistoricalOrdersEndpointSchema = {
path: '/sapi/v1/algo/spot/historicalOrders', 
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

export type GetHistoricalOrdersRequest = RequestUnion<any,
any,
{
'symbol': string;
'side': 'SELL' | 'BUY';
'startTime'?: number; // int
'endTime'?: number; // int
'page'?: number; // int
'pageSize'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetHistoricalOrdersResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'total': number; // int
'orders': (
{
'algoId': number; // int
'symbol': string;
'side': string;
'totalQty': string;
'executedQty': string;
'executedAmt': string;
'avgPrice': string;
'clientAlgoId': string;
'bookTime': number; // int
'endTime': number; // int
'algoStatus': string;
'algoType': string;
'urgency': string;
}
)[];
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetHistoricalOrdersRequestResult = RequestResult<GetHistoricalOrdersRequest, GetHistoricalOrdersResponse>

export function getHistoricalOrders(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetHistoricalOrdersRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetHistoricalOrdersRequestResult> {return requestHandler.execute(createRequest(getHistoricalOrdersEndpointSchema,
payload), config);}
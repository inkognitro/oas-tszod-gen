import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const getMyPreventedMatchesEndpointSchema = {
path: '/api/v3/myPreventedMatches', 
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

export type GetMyPreventedMatchesRequest = RequestUnion<any,
any,
{
'symbol': string;
'preventedMatchId'?: number; // int
'orderId'?: number; // int
'fromPreventedMatchId'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type GetMyPreventedMatchesResponse = ResponseUnion<200, ResponseBodyData<'application/json', (
{
'symbol': string;
'preventedMatchId': number; // int
'takerOrderId': number; // int
'makerOrderId': number; // int
'tradeGroupId': number; // int
'selfTradePreventionMode': string;
'price': string;
'makerPreventedQuantity': string;
'transactTime': number; // int
}
)[]>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type GetMyPreventedMatchesRequestResult = RequestResult<GetMyPreventedMatchesRequest, GetMyPreventedMatchesResponse>

export function getMyPreventedMatches(requestHandler: SimpleRequestHandler, payload: RequestPayload<GetMyPreventedMatchesRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<GetMyPreventedMatchesRequestResult> {return requestHandler.execute(createRequest(getMyPreventedMatchesEndpointSchema,
payload), config);}
import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postNewOrderVpEndpointSchema = {
path: '/sapi/v1/algo/futures/newOrderVp', 
method: 'post', 
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

export type PostNewOrderVpRequest = RequestUnion<any,
any,
{
'symbol': string;
'side': 'SELL' | 'BUY';
'positionSide'?: 'BOTH' | 'LONG' | 'SHORT';
'quantity': number;
'urgency': 'LOW' | 'MEDIUM' | 'HIGH';
'clientAlgoId'?: string;
'reduceOnly'?: boolean;
'limitPrice'?: number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostNewOrderVpResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'clientAlgoId': string;
'success': boolean;
'code': number; // int
'msg': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostNewOrderVpRequestResult = RequestResult<PostNewOrderVpRequest, PostNewOrderVpResponse>

export function postNewOrderVp(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostNewOrderVpRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostNewOrderVpRequestResult> {return requestHandler.execute(createRequest(postNewOrderVpEndpointSchema,
payload), config);}
import {RequestUnion, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig, RequestPayload} from '@example-outputs/binance/core';
import {Error} from '@example-outputs/binance';

export const postNewOrderTwapEndpointSchema = {
path: '/sapi/v1/algo/spot/newOrderTwap', 
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

export type PostNewOrderTwapRequest = RequestUnion<any,
any,
{
'symbol': string;
'side': 'SELL' | 'BUY';
'quantity': number;
'duration': number; // int
'clientAlgoId'?: string;
'limitPrice'?: number;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
}>

export type PostNewOrderTwapResponse = ResponseUnion<200, ResponseBodyData<'application/json', {
'clientAlgoId': string;
'success': boolean;
'code': number; // int
'msg': string;
}>> | ResponseUnion<400, ResponseBodyData<'application/json', Error>> | ResponseUnion<401, ResponseBodyData<'application/json', Error>>

export type PostNewOrderTwapRequestResult = RequestResult<PostNewOrderTwapRequest, PostNewOrderTwapResponse>

export function postNewOrderTwap(requestHandler: SimpleRequestHandler, payload: RequestPayload<PostNewOrderTwapRequest, 'queryParams', never>, config?: RequestHandlerExecutionConfig): Promise<PostNewOrderTwapRequestResult> {return requestHandler.execute(createRequest(postNewOrderTwapEndpointSchema,
payload), config);}
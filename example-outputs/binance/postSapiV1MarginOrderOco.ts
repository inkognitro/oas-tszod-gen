import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1MarginOrderOcoEndpointSchema = {
path: '/sapi/v1/margin/order/oco', 
method: 'post', 
supportedSecuritySchemas: [{ name: 'ApiKeyAuth', requiredPermissions: []}], 
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

export type PostSapiV1MarginOrderOcoPayload = {
'queryParams': {
'symbol': string;
'isIsolated'?: 'TRUE' | 'FALSE';
'listClientOrderId'?: string;
'side': 'SELL' | 'BUY';
'quantity': number;
'limitClientOrderId'?: string;
'price': number;
'limitIcebergQty'?: number;
'stopClientOrderId'?: string;
'stopPrice': number;
'stopLimitPrice'?: number;
'stopIcebergQty'?: number;
'stopLimitTimeInForce'?: 'GTC' | 'FOK' | 'IOC';
'newOrderRespType'?: 'ACK' | 'RESULT' | 'FULL';
'sideEffectType'?: 'NO_SIDE_EFFECT' | 'MARGIN_BUY' | 'AUTO_REPAY';
'selfTradePreventionMode'?: 'EXPIRE_TAKER' | 'EXPIRE_MAKER' | 'EXPIRE_BOTH' | 'NONE';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type PostSapiV1MarginOrderOcoResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'orderListId': number; // int
'contingencyType': string;
'listStatusType': string;
'listOrderStatus': string;
'listClientOrderId': string;
'transactionTime': number; // int
'symbol': string;
'marginBuyBorrowAmount': string;
'marginBuyBorrowAsset': string;
'isIsolated': boolean;
'orders': ({
'symbol': string;
'orderId': number; // int
'clientOrderId': string;
})[];
'orderReports': ({
'symbol': string;
'orderId': number; // int
'orderListId': number; // int
'clientOrderId': string;
'transactTime': number; // int
'price': string;
'origQty': string;
'executedQty': string;
'cummulativeQuoteQty': string;
'status': string;
'timeInForce': string;
'type': string;
'side': string;
'stopPrice': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1MarginOrderOcoRequestResult = RequestResult<Request, PostSapiV1MarginOrderOcoResponse>

export function postSapiV1MarginOrderOco(requestHandler: RequestHandler, payload: PostSapiV1MarginOrderOcoPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1MarginOrderOcoRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1MarginOrderOcoEndpointSchema}), config);}
import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginOrderlistEndpointSchema = {
path: '/sapi/v1/margin/orderList', 
method: 'get', 
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

export type GetSapiV1MarginOrderlistPayload = {
'queryParams': {
'isIsolated'?: 'TRUE' | 'FALSE';
'symbol'?: string;
'orderListId'?: number; // int
'origClientOrderId'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginOrderlistResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'orderListId': number; // int
'contingencyType': string;
'listStatusType': string;
'listOrderStatus': string;
'listClientOrderId': string;
'transactionTime': number; // int
'symbol': string;
'isIsolated': boolean;
'orders': ({
'symbol': string;
'orderId': number; // int
'clientOrderId': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginOrderlistRequestResult = RequestResult<Request, GetSapiV1MarginOrderlistResponse>

export function getSapiV1MarginOrderlist(requestHandler: RequestHandler, payload: GetSapiV1MarginOrderlistPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginOrderlistRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginOrderlistEndpointSchema}), config);}
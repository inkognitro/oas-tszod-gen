import {MarginOrderDetail, Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginOrderEndpointSchema = {
path: '/sapi/v1/margin/order', 
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

export type GetSapiV1MarginOrderPayload = {
'queryParams': {
'symbol': string;
'isIsolated'?: 'TRUE' | 'FALSE';
'orderId'?: number; // int
'origClientOrderId'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginOrderResponse = Response<200, ResponseData<ResponseBodyData<'application/json', MarginOrderDetail>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginOrderRequestResult = RequestResult<Request, GetSapiV1MarginOrderResponse>

export function getSapiV1MarginOrder(requestHandler: RequestHandler, payload: GetSapiV1MarginOrderPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginOrderRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginOrderEndpointSchema}), config);}
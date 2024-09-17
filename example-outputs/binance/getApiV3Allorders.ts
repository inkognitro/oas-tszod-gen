import {OrderDetails, Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getApiV3AllordersEndpointSchema = {
path: '/api/v3/allOrders', 
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

export type GetApiV3AllordersPayload = {
'queryParams': {
'symbol': string;
'orderId'?: number; // int
'startTime'?: number; // int
'endTime'?: number; // int
'limit'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetApiV3AllordersResponse = Response<200, ResponseData<ResponseBodyData<'application/json', (OrderDetails)[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetApiV3AllordersRequestResult = RequestResult<Request, GetApiV3AllordersResponse>

export function getApiV3Allorders(requestHandler: RequestHandler, payload: GetApiV3AllordersPayload, config?: RequestHandlerExecutionConfig): Promise<GetApiV3AllordersRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getApiV3AllordersEndpointSchema}), config);}
import {MarginOrderDetail, Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginOpenordersEndpointSchema = {
path: '/sapi/v1/margin/openOrders', 
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

export type GetSapiV1MarginOpenordersPayload = {
'queryParams': {
'symbol'?: string;
'isIsolated'?: 'TRUE' | 'FALSE';
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginOpenordersResponse = Response<200, ResponseData<ResponseBodyData<'application/json', (MarginOrderDetail)[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginOpenordersRequestResult = RequestResult<Request, GetSapiV1MarginOpenordersResponse>

export function getSapiV1MarginOpenorders(requestHandler: RequestHandler, payload: GetSapiV1MarginOpenordersPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginOpenordersRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginOpenordersEndpointSchema}), config);}
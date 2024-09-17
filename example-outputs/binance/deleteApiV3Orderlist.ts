import {OcoOrder, Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const deleteApiV3OrderlistEndpointSchema = {
path: '/api/v3/orderList', 
method: 'delete', 
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

export type DeleteApiV3OrderlistPayload = {
'queryParams': {
'symbol': string;
'orderListId'?: number; // int
'listClientOrderId'?: string;
'newClientOrderId'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type DeleteApiV3OrderlistResponse = Response<200, ResponseData<ResponseBodyData<'application/json', OcoOrder>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type DeleteApiV3OrderlistRequestResult = RequestResult<Request, DeleteApiV3OrderlistResponse>

export function deleteApiV3Orderlist(requestHandler: RequestHandler, payload: DeleteApiV3OrderlistPayload, config?: RequestHandlerExecutionConfig): Promise<DeleteApiV3OrderlistRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: deleteApiV3OrderlistEndpointSchema}), config);}
import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const deleteSapiV1AlgoFuturesOrderEndpointSchema = {
path: '/sapi/v1/algo/futures/order', 
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

export type DeleteSapiV1AlgoFuturesOrderPayload = {
'queryParams': {
'algoId': number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type DeleteSapiV1AlgoFuturesOrderResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'algoId': number; // int
'success': boolean;
'code': number; // int
'msg': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type DeleteSapiV1AlgoFuturesOrderRequestResult = RequestResult<Request, DeleteSapiV1AlgoFuturesOrderResponse>

export function deleteSapiV1AlgoFuturesOrder(requestHandler: RequestHandler, payload: DeleteSapiV1AlgoFuturesOrderPayload, config?: RequestHandlerExecutionConfig): Promise<DeleteSapiV1AlgoFuturesOrderRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: deleteSapiV1AlgoFuturesOrderEndpointSchema}), config);}
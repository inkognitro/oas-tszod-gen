import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1AlgoFuturesOpenordersEndpointSchema = {
path: '/sapi/v1/algo/futures/openOrders', 
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

export type GetSapiV1AlgoFuturesOpenordersPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1AlgoFuturesOpenordersResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'total': number; // int
'orders'?: ({
'algoId': number; // int
'symbol': string;
'side': string;
'positionSide': string;
'totalQty': string;
'executedQty': string;
'executedAmt': string;
'avgPrice': string;
'clientAlgoId': string;
'bookTime': number; // int
'endTime': number; // int
'algoStatus': string;
'algoType': string;
'urgency': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1AlgoFuturesOpenordersRequestResult = RequestResult<Request, GetSapiV1AlgoFuturesOpenordersResponse>

export function getSapiV1AlgoFuturesOpenorders(requestHandler: RequestHandler, payload: GetSapiV1AlgoFuturesOpenordersPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1AlgoFuturesOpenordersRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1AlgoFuturesOpenordersEndpointSchema}), config);}
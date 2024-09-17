import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const postSapiV1AlgoFuturesNewordervpEndpointSchema = {
path: '/sapi/v1/algo/futures/newOrderVp', 
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

export type PostSapiV1AlgoFuturesNewordervpPayload = {
'queryParams': {
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
};
}

export type PostSapiV1AlgoFuturesNewordervpResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'clientAlgoId': string;
'success': boolean;
'code': number; // int
'msg': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type PostSapiV1AlgoFuturesNewordervpRequestResult = RequestResult<Request, PostSapiV1AlgoFuturesNewordervpResponse>

export function postSapiV1AlgoFuturesNewordervp(requestHandler: RequestHandler, payload: PostSapiV1AlgoFuturesNewordervpPayload, config?: RequestHandlerExecutionConfig): Promise<PostSapiV1AlgoFuturesNewordervpRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: postSapiV1AlgoFuturesNewordervpEndpointSchema}), config);}
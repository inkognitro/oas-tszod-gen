import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MiningPubCoinlistEndpointSchema = {
path: '/sapi/v1/mining/pub/coinList', 
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
}
}
}

export type GetSapiV1MiningPubCoinlistResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': number; // int
'msg': string;
'data': ({
'coinName': string;
'coinId': number; // int
'poolIndex': number; // int
'algoId': number; // int
'algoName': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MiningPubCoinlistRequestResult = RequestResult<Request, GetSapiV1MiningPubCoinlistResponse>

export function getSapiV1MiningPubCoinlist(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MiningPubCoinlistRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getSapiV1MiningPubCoinlistEndpointSchema}), config);}
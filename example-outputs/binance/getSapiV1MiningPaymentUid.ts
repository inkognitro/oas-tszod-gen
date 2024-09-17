import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MiningPaymentUidEndpointSchema = {
path: '/sapi/v1/mining/payment/uid', 
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

export type GetSapiV1MiningPaymentUidPayload = {
'queryParams': {
'algo': string;
'startDate'?: string;
'endDate'?: string;
'pageIndex'?: number; // int
'pageSize'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MiningPaymentUidResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'code': number; // int
'msg': string;
'data': {
'accountProfits': ({
'time': number; // int
'coinName': string;
'type': number; // int
'puid': number; // int
'subName': string;
'amount': number;
})[];
'totalNum': number; // int
'pageSize': number; // int
};
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MiningPaymentUidRequestResult = RequestResult<Request, GetSapiV1MiningPaymentUidResponse>

export function getSapiV1MiningPaymentUid(requestHandler: RequestHandler, payload: GetSapiV1MiningPaymentUidPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MiningPaymentUidRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MiningPaymentUidEndpointSchema}), config);}
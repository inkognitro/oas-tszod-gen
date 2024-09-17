import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1SimpleEarnFlexibleHistoryRatehistoryEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/history/rateHistory', 
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

export type GetSapiV1SimpleEarnFlexibleHistoryRatehistoryPayload = {
'queryParams': {
'productId': string;
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SimpleEarnFlexibleHistoryRatehistoryResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'productId': string;
'asset': string;
'annualPercentageRate': string;
'time': number; // int
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnFlexibleHistoryRatehistoryRequestResult = RequestResult<Request, GetSapiV1SimpleEarnFlexibleHistoryRatehistoryResponse>

export function getSapiV1SimpleEarnFlexibleHistoryRatehistory(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnFlexibleHistoryRatehistoryPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnFlexibleHistoryRatehistoryRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnFlexibleHistoryRatehistoryEndpointSchema}), config);}
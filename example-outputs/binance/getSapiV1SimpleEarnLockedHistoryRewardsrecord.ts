import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1SimpleEarnLockedHistoryRewardsrecordEndpointSchema = {
path: '/sapi/v1/simple-earn/locked/history/rewardsRecord', 
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

export type GetSapiV1SimpleEarnLockedHistoryRewardsrecordPayload = {
'queryParams': {
'positionId'?: string;
'asset'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SimpleEarnLockedHistoryRewardsrecordResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'positionId': string;
'time': number; // int
'asset': string;
'lockPeriod': string;
'amount': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnLockedHistoryRewardsrecordRequestResult = RequestResult<Request, GetSapiV1SimpleEarnLockedHistoryRewardsrecordResponse>

export function getSapiV1SimpleEarnLockedHistoryRewardsrecord(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnLockedHistoryRewardsrecordPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnLockedHistoryRewardsrecordRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnLockedHistoryRewardsrecordEndpointSchema}), config);}
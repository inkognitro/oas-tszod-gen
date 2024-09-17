import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1SimpleEarnFlexibleHistoryRedemptionrecordEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/history/redemptionRecord', 
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

export type GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordPayload = {
'queryParams': {
'productId'?: string;
'redeemId'?: string;
'asset'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
};
}

export type GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'amount': string;
'asset': string;
'time': number; // int
'projectId': string;
'redeemId': number; // int
'destAccount': string;
'status': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordRequestResult = RequestResult<Request, GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordResponse>

export function getSapiV1SimpleEarnFlexibleHistoryRedemptionrecord(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnFlexibleHistoryRedemptionrecordRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnFlexibleHistoryRedemptionrecordEndpointSchema}), config);}
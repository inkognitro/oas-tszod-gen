import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1SimpleEarnFlexibleHistorySubscriptionrecordEndpointSchema = {
path: '/sapi/v1/simple-earn/flexible/history/subscriptionRecord', 
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

export type GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordPayload = {
'queryParams': {
'productId'?: string;
'purchaseId'?: string;
'asset'?: string;
'startTime'?: number; // int
'endTime'?: number; // int
'current'?: number; // int
'size'?: number; // int
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'rows': ({
'amount': string;
'asset': string;
'time': number; // int
'purchaseId': number; // int
'type': string;
'sourceAccount': string;
'amtFromSpot': string;
'amtFromFunding': string;
'status': string;
})[];
'total': number; // int
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordRequestResult = RequestResult<Request, GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordResponse>

export function getSapiV1SimpleEarnFlexibleHistorySubscriptionrecord(requestHandler: RequestHandler, payload: GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SimpleEarnFlexibleHistorySubscriptionrecordRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SimpleEarnFlexibleHistorySubscriptionrecordEndpointSchema}), config);}
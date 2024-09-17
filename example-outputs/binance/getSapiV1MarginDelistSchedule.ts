import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginDelistScheduleEndpointSchema = {
path: '/sapi/v1/margin/delist-schedule', 
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

export type GetSapiV1MarginDelistSchedulePayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginDelistScheduleResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'delistTime'?: number; // int
'crossMarginAssets'?: (string)[];
'isolatedMarginSymbols'?: (string)[];
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginDelistScheduleRequestResult = RequestResult<Request, GetSapiV1MarginDelistScheduleResponse>

export function getSapiV1MarginDelistSchedule(requestHandler: RequestHandler, payload: GetSapiV1MarginDelistSchedulePayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginDelistScheduleRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginDelistScheduleEndpointSchema}), config);}
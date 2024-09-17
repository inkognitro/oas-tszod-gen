import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1SpotDelistScheduleEndpointSchema = {
path: '/sapi/v1/spot/delist-schedule', 
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

export type GetSapiV1SpotDelistSchedulePayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SpotDelistScheduleResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'delistTime': number; // int
'symbol': (string)[];
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SpotDelistScheduleRequestResult = RequestResult<Request, GetSapiV1SpotDelistScheduleResponse>

export function getSapiV1SpotDelistSchedule(requestHandler: RequestHandler, payload: GetSapiV1SpotDelistSchedulePayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SpotDelistScheduleRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SpotDelistScheduleEndpointSchema}), config);}
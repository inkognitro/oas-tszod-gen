import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1SystemStatusEndpointSchema = {
path: '/sapi/v1/system/status', 
method: 'get', 
supportedSecuritySchemas: [], 
bodyByContentType: {}, 
responseByStatus: {
'200': {
bodyByContentType: {
'application/json': {

}
}
}
}
}

export type GetSapiV1SystemStatusResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'status': number; // int
'msg': string;
}>>>

export type GetSapiV1SystemStatusRequestResult = RequestResult<Request, GetSapiV1SystemStatusResponse>

export function getSapiV1SystemStatus(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SystemStatusRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getSapiV1SystemStatusEndpointSchema}), config);}
import {Request, ResponseBodyData, ResponseUnion, RequestResult, SimpleRequestHandler, createRequest, RequestHandlerExecutionConfig} from '@example-outputs/binance/core';

export const getPingEndpointSchema = {
path: '/api/v3/ping', 
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

export type GetPingRequest = Request

export type GetPingResponse = ResponseUnion<200, ResponseBodyData<'application/json', {

}>>

export type GetPingRequestResult = RequestResult<GetPingRequest, GetPingResponse>

export function getPing(requestHandler: SimpleRequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetPingRequestResult> {return requestHandler.execute(createRequest(getPingEndpointSchema), config);}
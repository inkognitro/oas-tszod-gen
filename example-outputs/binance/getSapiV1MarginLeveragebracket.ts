import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginLeveragebracketEndpointSchema = {
path: '/sapi/v1/margin/leverageBracket', 
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

export type GetSapiV1MarginLeveragebracketResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'assetNames': (string)[];
'rank': number; // int
'brackets': ({
'leverage'?: number; // int
'maxDebt'?: number;
'maintenanceMarginRate'?: number;
'initialMarginRate'?: number;
'fastNum'?: number;
})[];
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginLeveragebracketRequestResult = RequestResult<Request, GetSapiV1MarginLeveragebracketResponse>

export function getSapiV1MarginLeveragebracket(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginLeveragebracketRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getSapiV1MarginLeveragebracketEndpointSchema}), config);}
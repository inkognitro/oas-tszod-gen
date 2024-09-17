import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginAllassetsEndpointSchema = {
path: '/sapi/v1/margin/allAssets', 
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

export type GetSapiV1MarginAllassetsPayload = {
'queryParams': {
'asset': string;
};
}

export type GetSapiV1MarginAllassetsResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'assetFullName': string;
'assetName': string;
'isBorrowable': boolean;
'isMortgageable': boolean;
'userMinBorrow': string;
'userMinRepay': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginAllassetsRequestResult = RequestResult<Request, GetSapiV1MarginAllassetsResponse>

export function getSapiV1MarginAllassets(requestHandler: RequestHandler, payload: GetSapiV1MarginAllassetsPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginAllassetsRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginAllassetsEndpointSchema}), config);}
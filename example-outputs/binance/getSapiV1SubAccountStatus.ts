import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1SubAccountStatusEndpointSchema = {
path: '/sapi/v1/sub-account/status', 
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

export type GetSapiV1SubAccountStatusPayload = {
'queryParams': {
'email'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1SubAccountStatusResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'email': string;
'isSubUserEnabled': boolean;
'isUserActive': boolean;
'insertTime': number; // int
'isMarginEnabled': boolean;
'isFutureEnabled': boolean;
'mobile': number; // int
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1SubAccountStatusRequestResult = RequestResult<Request, GetSapiV1SubAccountStatusResponse>

export function getSapiV1SubAccountStatus(requestHandler: RequestHandler, payload: GetSapiV1SubAccountStatusPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1SubAccountStatusRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1SubAccountStatusEndpointSchema}), config);}
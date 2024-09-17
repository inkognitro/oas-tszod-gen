import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1CapitalWithdrawAddressListEndpointSchema = {
path: '/sapi/v1/capital/withdraw/address/list', 
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

export type GetSapiV1CapitalWithdrawAddressListResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'address': string;
'addressTag': string;
'coin': string;
'name': string;
'network': string;
'origin': string;
'originType': string;
'whiteStatus': boolean;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1CapitalWithdrawAddressListRequestResult = RequestResult<Request, GetSapiV1CapitalWithdrawAddressListResponse>

export function getSapiV1CapitalWithdrawAddressList(requestHandler: RequestHandler, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1CapitalWithdrawAddressListRequestResult> {return requestHandler.execute(createRequest({endpointSchema: getSapiV1CapitalWithdrawAddressListEndpointSchema}), config);}
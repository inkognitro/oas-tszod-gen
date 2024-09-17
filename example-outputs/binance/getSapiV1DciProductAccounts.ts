import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1DciProductAccountsEndpointSchema = {
path: '/sapi/v1/dci/product/accounts', 
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

export type GetSapiV1DciProductAccountsPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1DciProductAccountsResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'totalAmountInBTC': string;
'totalAmountInUSDT': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1DciProductAccountsRequestResult = RequestResult<Request, GetSapiV1DciProductAccountsResponse>

export function getSapiV1DciProductAccounts(requestHandler: RequestHandler, payload: GetSapiV1DciProductAccountsPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1DciProductAccountsRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1DciProductAccountsEndpointSchema}), config);}
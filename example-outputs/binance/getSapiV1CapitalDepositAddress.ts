import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1CapitalDepositAddressEndpointSchema = {
path: '/sapi/v1/capital/deposit/address', 
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

export type GetSapiV1CapitalDepositAddressPayload = {
'queryParams': {
'coin': string;
'network'?: string;
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1CapitalDepositAddressResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'address': string;
'coin': string;
'tag': string;
'url': string;
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1CapitalDepositAddressRequestResult = RequestResult<Request, GetSapiV1CapitalDepositAddressResponse>

export function getSapiV1CapitalDepositAddress(requestHandler: RequestHandler, payload: GetSapiV1CapitalDepositAddressPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1CapitalDepositAddressRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1CapitalDepositAddressEndpointSchema}), config);}
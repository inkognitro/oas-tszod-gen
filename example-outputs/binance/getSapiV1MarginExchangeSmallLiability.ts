import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginExchangeSmallLiabilityEndpointSchema = {
path: '/sapi/v1/margin/exchange-small-liability', 
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

export type GetSapiV1MarginExchangeSmallLiabilityPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginExchangeSmallLiabilityResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'asset': string;
'interest': string;
'principal': string;
'liabilityAsset': string;
'liabilityQty': number;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginExchangeSmallLiabilityRequestResult = RequestResult<Request, GetSapiV1MarginExchangeSmallLiabilityResponse>

export function getSapiV1MarginExchangeSmallLiability(requestHandler: RequestHandler, payload: GetSapiV1MarginExchangeSmallLiabilityPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginExchangeSmallLiabilityRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginExchangeSmallLiabilityEndpointSchema}), config);}
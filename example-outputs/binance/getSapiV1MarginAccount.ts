import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1MarginAccountEndpointSchema = {
path: '/sapi/v1/margin/account', 
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

export type GetSapiV1MarginAccountPayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1MarginAccountResponse = Response<200, ResponseData<ResponseBodyData<'application/json', {
'borrowEnabled': boolean;
'marginLevel': string;
'totalAssetOfBtc': string;
'totalLiabilityOfBtc': string;
'totalNetAssetOfBtc': string;
'tradeEnabled': boolean;
'transferEnabled': boolean;
'userAssets': ({
'asset': string;
'borrowed': string;
'free': string;
'interest': string;
'locked': string;
'netAsset': string;
})[];
}>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1MarginAccountRequestResult = RequestResult<Request, GetSapiV1MarginAccountResponse>

export function getSapiV1MarginAccount(requestHandler: RequestHandler, payload: GetSapiV1MarginAccountPayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1MarginAccountRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1MarginAccountEndpointSchema}), config);}
import {Error} from '@/test-outputs/binance';
import {ResponseBodyData, ResponseData, Response, RequestResult, Request, RequestHandler, createRequest, RequestHandlerExecutionConfig} from '@/test-outputs/binance/core';

export const getSapiV1AssetWalletBalanceEndpointSchema = {
path: '/sapi/v1/asset/wallet/balance', 
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

export type GetSapiV1AssetWalletBalancePayload = {
'queryParams': {
'recvWindow'?: number; // int
'timestamp': number; // int
'signature': string;
};
}

export type GetSapiV1AssetWalletBalanceResponse = Response<200, ResponseData<ResponseBodyData<'application/json', ({
'activate': boolean;
'balance': string;
'walletName': string;
})[]>>> | Response<400, ResponseData<ResponseBodyData<'application/json', Error>>> | Response<401, ResponseData<ResponseBodyData<'application/json', Error>>>

export type GetSapiV1AssetWalletBalanceRequestResult = RequestResult<Request, GetSapiV1AssetWalletBalanceResponse>

export function getSapiV1AssetWalletBalance(requestHandler: RequestHandler, payload: GetSapiV1AssetWalletBalancePayload, config?: RequestHandlerExecutionConfig): Promise<GetSapiV1AssetWalletBalanceRequestResult> {return requestHandler.execute(createRequest({...payload,
endpointSchema: getSapiV1AssetWalletBalanceEndpointSchema}), config);}